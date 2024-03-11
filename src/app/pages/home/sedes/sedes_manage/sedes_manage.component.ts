import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SedeService, SedeServiceData } from '@services/sede.service';

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

  public sedeData = computed<SedeServiceData>(()=>this.sedeService.sedeData());

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


  getTypeError(field: any, type: any) {
    return this.formSedes.get(field)?.invalid && this.formSedes.get(field)?.touched && this.formSedes.get(field)?.hasError(type)
  }

  getInputError(field: any){
    return this.formSedes.get(field)?.invalid && this.formSedes.get(field)?.touched
  }
}
