import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SedeService, SedeServiceData } from '@services/sede.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-sedes-manage',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './sedes_manage.component.html',
  styleUrl: './sedes_manage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SedesManageComponent {

  private formBuilder = inject(FormBuilder);
  private sedeService = inject(SedeService);
  public router = inject(Router);
  private routeActive = inject(ActivatedRoute);

  public sedeData = computed<SedeServiceData>(()=>this.sedeService.sedeData());

  sede = toSignal(
    this.routeActive.params.pipe(
      switchMap(({ sedeId }) => this.sedeService.getSede(sedeId).pipe(
        tap(data=>{
          if(data){
            this.formSedes.patchValue(data!);
          }
        })
      )),
    )
  );

  formSedes = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
    companyId:[this.sedeData().companyId!]
  })

  createSede(){
    if (
      this.formSedes.invalid
    ) {
      this.formSedes.markAllAsTouched();
      return;
    }
    this.sedeService.create(this.formSedes.value).subscribe(
      {
        next:(value)=>{
          this.sedeService.getSedesById(this.sedeData().companyId!);
          this.router.navigate(['/home/sedes',this.sedeData().companyId]);
        }
      }
    )
  }

  updateSede(){
    if (
      this.formSedes.invalid
    ) {
      this.formSedes.markAllAsTouched();
      return;
    }
    this.sedeService.updateSede(this.sede()!.id,this.formSedes.value).subscribe(
      {
        next:(value)=>{
          this.sedeService.getSedesById(this.sedeData().companyId!).subscribe();
          this.router.navigate(['/home/sedes',this.sedeData().companyId]);
        }
      }
    )
  }


  getTypeError(field: any, type: any) {
    return this.formSedes.get(field)?.invalid && this.formSedes.get(field)?.touched && this.formSedes.get(field)?.hasError(type)
  }

  getInputError(field: any){
    return this.formSedes.get(field)?.invalid && this.formSedes.get(field)?.touched
  }
}
