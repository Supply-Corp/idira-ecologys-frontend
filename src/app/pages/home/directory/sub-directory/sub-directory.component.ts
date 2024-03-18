import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sub-directory',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sub-directory.component.html',
  styleUrl: './sub-directory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SubDirectoryComponent { }
