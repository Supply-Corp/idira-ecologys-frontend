import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sedes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sedes.component.html',
  styleUrl: './sedes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SedesComponent { }
