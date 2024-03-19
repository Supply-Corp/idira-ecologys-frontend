import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SubDirectory, SubDirectoryResponse } from '@interfaces/directory';
import { DirectoriesService, SubDirectoryServiceData } from '@services/directories.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-sub-directory',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './sub-directory.component.html',
  styleUrl: './sub-directory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SubDirectoryComponent {
  private routeActive = inject(ActivatedRoute);
  private directoryService = inject(DirectoriesService);

  displayedColumns: string[] = ['name', 'directory', 'opt'];

  public subDirectoryData = computed<SubDirectoryServiceData>(()=>this.directoryService.subDirectoryData());
  public subdirectories =  computed<SubDirectory[]>(()=>this.subDirectoryData().subdirectory);

  routeParamsSignal = toSignal(
    this.routeActive.params.pipe(
      switchMap(({ id }) => this.directoryService.getSubDirectory(id))
    )
  );

  constructor(){
    this.routeParamsSignal()
  }

  deleteSede(id:number){
    this.directoryService.deleteSubDirectory(id)
    .subscribe(_=>{
      this.directoryService.getSubDirectory(this.subDirectoryData().directoryId!).subscribe();
    })
  }
 }
