import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sedes-manage',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './sedes_manage.component.html',
  styleUrl: './sedes_manage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SedesManageComponent { }
