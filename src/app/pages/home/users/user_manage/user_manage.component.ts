import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { Roles } from '@interfaces/roles';
import { CompanyService } from '@services/company.service';
import { Company } from '@interfaces/companyResponse';
import { SedeService } from '@services/sede.service';
import { Sede } from '@interfaces/sedes';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './user_manage.component.html',
  styleUrl: './user_manage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserManageComponent {

  private formBuilder = inject(FormBuilder);
  private companyService = inject(CompanyService);
  private sedeService = inject(SedeService);
  private userService = inject(UserService);
  private routeActive = inject(ActivatedRoute);
  private router = inject(Router);

  public companyData = this.companyService.companyData;
  public dataCompanies = computed<Company[]>(()=>this.companyData().companies);
  public dataUser = this.userService.userData;
  public sedes = signal<Sede[]>([]);

  roles = Roles;

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role : ['', [ Validators.required]],
    sedeId:['',[ ]]
  })


  roleChange = toSignal(this.form.get('role')!.valueChanges.pipe(
    tap( (value)=>{
      if(value == this.roles.SEDE){
      console.log(value)
        this.form.get('sedeId')?.setValidators([Validators.required]);
      }else{
        this.form.get('sedeId')?.setValidators([]);
      }
      this.form.updateValueAndValidity();
      this.form.get('sedeId')?.reset()

    } )
  ));


  user = toSignal(
    this.routeActive.params.pipe(
      switchMap(({ id }) => this.userService.getById(id).pipe(
        tap(data=>{
          if(data){
            this.form.patchValue(data!);

            this.form.get('password')?.setValidators([]);
            this.form.updateValueAndValidity();
            this.form.get('password')?.reset()
          }
        })
      )),
    )
  );



  createUser(){
    if (
      this.form.invalid
    ) {
      this.form.markAllAsTouched();
      return;
    }
    const finalForm = {...this.form.value};
    if(finalForm.role != this.roles.SEDE){
      finalForm.sedeId = '';
    }
    console.log(this.form.value)
    this.userService.create(finalForm).subscribe(
      value=>{
        this.userService.getUsers()
        this.router.navigate(['/home/users']);
      }
    )
  }

  updateUser(){
    if (
      this.form.invalid
    ) {
      this.form.markAllAsTouched();
      return;
    }
    const finalForm = {...this.form.value};
    if(finalForm.role != this.roles.SEDE){
      finalForm.sedeId = '';
    }
    console.log(this.form.value)
    this.userService.update(this.user()!.id,finalForm).subscribe(
      value=>{
        this.userService.getUsers()
        this.router.navigate(['/home/users']);
      }
    )
  }

  getSedeById(id:any){
    console.log(id)
    if(!id){
      return
    }
    this.sedeService.getSedesById(id).subscribe(value=>{
      this.sedes.set(value);
    })
  }


  getTypeError(field: any, type: any) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched && this.form.get(field)?.hasError(type)
  }

  getInputError(field: any){
    return this.form.get(field)?.invalid && this.form.get(field)?.touched
  }
}
