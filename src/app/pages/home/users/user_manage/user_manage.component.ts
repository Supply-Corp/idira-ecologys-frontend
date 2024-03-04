import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    MatSelectModule
  ],
  templateUrl: './user_manage.component.html',
  styleUrl: './user_manage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserManageComponent { }
