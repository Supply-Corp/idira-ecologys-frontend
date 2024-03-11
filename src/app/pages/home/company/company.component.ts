import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CompanyService, CompanyServiceData } from '@services/company.service';
import { Company } from '@interfaces/companyResponse';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompanyComponent {

  private companyService = inject(CompanyService);

  constructor(){

  }

  public companyData = this.companyService.companyData;

  displayedColumns: string[] = ['name', 'email', 'razon_social', 'ruc', 'distrito', 'provincia', 'address', 'opt'];
  // displayedColumns: string[] = ['Nombre', 'Email', 'Razón Social', 'Ruc', 'Distrito', 'Provincia', 'Dirección'];
  dataSource = computed<Company[]>(()=>this.companyData().companies);

  deleteCompany(id:number){
    this.companyService.delete(id)
    .subscribe(_=>{
      this.companyService.get();
    })
  }

}
