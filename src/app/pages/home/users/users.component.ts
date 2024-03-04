import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent {

  displayedColumns: string[] = ['name', 'email', 'role', 'opt'];
  // displayedColumns: string[] = ['Nombre', 'Email', 'Razón Social', 'Ruc', 'Distrito', 'Provincia', 'Dirección'];
  dataSource = [
    {
      "email":"test@gmail.com",
      "name":"Andri Suarez",
      "role":"ADMIN",
      "sedeId": ""
    },
    {
      "email":"test@gmail.com",
      "name":"Andri Suarez",
      "role":"ADMIN",
      "sedeId": ""
    }
  ];

}
