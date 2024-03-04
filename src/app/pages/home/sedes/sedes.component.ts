import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sedes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './sedes.component.html',
  styleUrl: './sedes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SedesComponent {

  displayedColumns: string[] = ['name', 'address', 'email', 'opt'];

  dataSource = [
    {
      "name":"sede sur  ",
      "address":"kr 17 #33-44",
      "email":"sede-norte@dattatech.com",
      "companyId": 3
    },
    {
      "name":"sede sur  ",
      "address":"kr 17 #33-44",
      "email":"sede-norte@dattatech.com",
      "companyId": 3
    }
  ];
 }
