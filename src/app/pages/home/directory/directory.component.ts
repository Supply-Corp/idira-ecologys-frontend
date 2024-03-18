import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { Directory } from '@interfaces/directory';
import { DirectoriesService } from '@services/directories.service';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export default class DirectoryComponent {

  private directoryService = inject(DirectoriesService);

  public directoryData = this.directoryService.directoryData;

  displayedColumns: string[] = ['name', 'opt'];
  dataSource = computed<Directory[]>(()=>this.directoryData().directories);

  deleteDirectory(id:number){
    this.directoryService.delete(id)
    .subscribe(_=>{
      this.directoryService.get();
    })
  }
 }
