import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocumentsComponent { }
