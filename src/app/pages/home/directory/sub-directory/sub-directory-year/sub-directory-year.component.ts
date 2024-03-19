import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SubDirectoryYear } from '@interfaces/directory';
import { DirectoriesService, SubDirectoryYearServiceData } from '@services/directories.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-sub-directory-year',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './sub-directory-year.component.html',
  styleUrl: './sub-directory-year.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SubDirectoryYearComponent {

  private routeActive = inject(ActivatedRoute);
  private directoryService = inject(DirectoriesService);

  displayedColumns: string[] = ['name', 'opt'];

  public subDirectoryYearData = computed<SubDirectoryYearServiceData>(()=>this.directoryService.subDirectoryYearData());
  public subdirectoriesYear =  computed<SubDirectoryYear[]>(()=>this.subDirectoryYearData().subdirectoryYear);

  routeParamsSignal = toSignal(
    this.routeActive.params.pipe(
      switchMap(({ subDirId }) => this.directoryService.getSubDirectoryYear(subDirId))
    )
  );

  constructor(){
    this.routeParamsSignal()
  }

  deleteSede(id:number){
    this.directoryService.deleteSubDirectoryYear(id)
    .subscribe(_=>{
      this.directoryService.getSubDirectoryYear(this.subDirectoryYearData().subdirectoryId!).subscribe();
    })
  }
}
