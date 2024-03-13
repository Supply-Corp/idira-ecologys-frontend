import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CompanyService, CompanyServiceData } from '@services/company.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Company, SubManager } from '@interfaces/companyResponse';
import { switchMap, tap } from 'rxjs';
import { SedeService } from '@services/sede.service';

@Component({
  selector: 'app-company-manage',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './company_manage.component.html',
  styleUrl: './company_manage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompanyManageComponent {

  private routeActive = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private companyService = inject(CompanyService);
  public companyData = computed<CompanyServiceData>(()=>this.companyService.companyData());
  public router = inject(Router);

  constructor(){

  }

  company = toSignal<any>(
    this.routeActive.params.pipe(
      switchMap(({ id }) => this.companyService.getCompany(id).pipe(
        tap(data=>{
          if(data){
            this.formCompany.patchValue(data!);
            this.setDataFormRepresentative(data!.Representative!);
            this.setDataManager(data!.GeneralManager!);
            this.setDataSupervisor(data!.Supervisor!)
          }
        })
      )),
    )
  );


  formCompany = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    razon_social: ['', [Validators.required]],
    ruc: ['', [Validators.required]],
    distrito: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    address: ['', [Validators.required]],
  })

  formRepresentative = this.formBuilder.group({
    name_representative: ['', [Validators.required]],
    dni_representative: ['', [Validators.required]],
    email_representative: [''],
  })

  formManager = this.formBuilder.group({
    name_general_manager: ['', [Validators.required]],
    dni_general_manager: ['', [Validators.required]],
    email_general_manager: [''],
  })

  formSupervisor = this.formBuilder.group({
    name_supervisor: ['', [Validators.required]],
    dni_supervisor: ['', [Validators.required]],
    email_supervisor: [''],

  })

  CreateCompany(){
    if (
      this.formCompany.invalid ||
      this.formRepresentative.invalid ||
      this.formSupervisor.invalid ||
      this.formManager.invalid
    ) {
      this.formCompany.markAllAsTouched();
      this.formRepresentative.markAllAsTouched();
      this.formSupervisor.markAllAsTouched();
      this.formManager.markAllAsTouched();
      return;
    }

    this.companyService.create({
      ...this.formCompany.value,
      ...this.formRepresentative.value,
      ...this.formManager.value,
      ...this.formSupervisor.value
    }).subscribe(
      {
        next:(value)=>{
          this.companyService.get();
          this.router.navigate(['/home/companies']);
          console.log(value)
        }
      }
    )

  }

  UpdateCompany(){
    if (
      this.formCompany.invalid ||
      this.formRepresentative.invalid ||
      this.formSupervisor.invalid ||
      this.formManager.invalid
    ) {
      this.formCompany.markAllAsTouched();
      this.formRepresentative.markAllAsTouched();
      this.formSupervisor.markAllAsTouched();
      this.formManager.markAllAsTouched();
      return;
    }

    this.companyService.updateCompany(
      this.company().id,
      {
      ...this.formCompany.value,
      ...this.formRepresentative.value,
      ...this.formManager.value,
      ...this.formSupervisor.value
    }).subscribe(
      {
        next:(value)=>{
          this.companyService.get();
          this.router.navigate(['/home/companies']);
          console.log(value)
        }
      }
    )
  }

  getTypeError(field: any, type: any, form: string) {
    let formChange: FormGroup;

    switch(form){
      case 'representative':{
        formChange = this.formRepresentative;
        break;
      }
      case 'manager':{
        formChange = this.formManager;
        break;
      }
      case 'supervisor':{
        formChange = this.formSupervisor;
        break;
      }
      default:{
        formChange = this.formCompany;
      }
    }

    return formChange.get(field)?.invalid && formChange.get(field)?.touched && formChange.get(field)?.hasError(type)
  }

  getInputError(field: any, form: string){

    let formChange: FormGroup;

    switch(form){
      case 'representative':{
        formChange = this.formRepresentative;
        break;
      }
      case 'manager':{
        formChange = this.formManager;
        break;
      }
      case 'supervisor':{
        formChange = this.formSupervisor;
        break;
      }
      default:{
        formChange = this.formCompany;
      }
    }

    return formChange.get(field)?.invalid && formChange.get(field)?.touched
  }

  setDataFormRepresentative(data:SubManager){
    this.formRepresentative.patchValue({
      dni_representative: data.dni,
      email_representative:data.email,
      name_representative:data.name
    })
  }

  setDataManager(data:SubManager){
    this.formManager.patchValue({
      dni_general_manager: data.dni,
      email_general_manager:data.email,
      name_general_manager:data.name
    })
  }

  setDataSupervisor(data:SubManager){
    this.formSupervisor.patchValue({
      dni_supervisor: data.dni,
      email_supervisor:data.email,
      name_supervisor:data.name
    })
  }

 }
