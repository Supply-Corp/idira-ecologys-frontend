import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompanyComponent {

  displayedColumns: string[] = ['name', 'email', 'razon_social', 'ruc', 'distrito', 'provincia', 'address', 'opt'];
  // displayedColumns: string[] = ['Nombre', 'Email', 'Razón Social', 'Ruc', 'Distrito', 'Provincia', 'Dirección'];
  dataSource = [
    {
      "name":"    Dattatech Studio     ",
      "email": "info@dattatech.com",
      "razon_social":"Andri Suarez",
      "ruc":"154776769",
      "distrito":"lara",
      "provincia":"barquisimeto",
      "address":"carrera 7a #17-25",

      "name_representative":"andri suarez",
      "dni_representative":"154776769",
      "email_representative":"",

      "name_general_manager":"andri suarez",
      "dni_general_manager":"154776769",
      "email_general_manager":"",

      "name_supervisor":"andri suarez",
      "dni_supervisor":"154776769",
      "email_supervisor":""
    },
    {
      "name":"    Dattatech Studio     ",
      "email": "info@dattatech.com",
      "razon_social":"Andri Suarez",
      "ruc":"154776769",
      "distrito":"lara",
      "provincia":"barquisimeto",
      "address":"carrera 7a #17-25",

      "name_representative":"andri suarez",
      "dni_representative":"154776769",
      "email_representative":"",

      "name_general_manager":"andri suarez",
      "dni_general_manager":"154776769",
      "email_general_manager":"",

      "name_supervisor":"andri suarez",
      "dni_supervisor":"154776769",
      "email_supervisor":""
    }
  ];

}
