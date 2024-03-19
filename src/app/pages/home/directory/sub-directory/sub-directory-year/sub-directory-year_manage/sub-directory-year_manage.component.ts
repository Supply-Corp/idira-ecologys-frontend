import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DirectoriesService, SubDirectoryServiceData, SubDirectoryYearServiceData } from '@services/directories.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-sub-directory-year-manage',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './sub-directory-year_manage.component.html',
  styleUrl: './sub-directory-year_manage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SubDirectoryYearManageComponent {


  private formBuilder = inject(FormBuilder);
  public router = inject(Router);
  private routeActive = inject(ActivatedRoute);
  private directoriesService = inject(DirectoriesService);

  public subdirectoryYearData = computed<SubDirectoryYearServiceData>(()=>this.directoriesService.subDirectoryYearData());
  public subdirectoryData = computed<SubDirectoryServiceData>(()=>this.directoriesService.subDirectoryData());

  subdirectoryYear = toSignal(
    this.routeActive.params.pipe(
      switchMap(({ subDirYearId }) => this.directoriesService.getSubDirectoryYearById(subDirYearId).pipe(
        tap(data=>{
          if(data){
            this.formSubDirectoryYear.patchValue(data!);
          }
        })
      )),
    )
  );

  formSubDirectoryYear = this.formBuilder.group({
    name: ['', [Validators.required]],
    subDirectoryId:[this.subdirectoryYearData().subdirectoryId!]
  })

  create(){
    if (
      this.formSubDirectoryYear.invalid
    ) {
      this.formSubDirectoryYear.markAllAsTouched();
      return;
    }
    this.directoriesService.createSubDirectoryYear(this.formSubDirectoryYear.value).subscribe(
      {
        next:(value)=>{
          this.directoriesService.getSubDirectoryYear(this.subdirectoryYearData().subdirectoryId!);
          this.router.navigate(['/home/categories/subdirectory/', this.subdirectoryData().directoryId, 'years',this.subdirectoryYearData().subdirectoryId]);
        }
      }
    )
  }

  update(){
    if (
      this.formSubDirectoryYear.invalid
    ) {
      this.formSubDirectoryYear.markAllAsTouched();
      return;
    }
    this.directoriesService.updateSubDirectoryYear(this.subdirectoryYear()!.id, this.formSubDirectoryYear.value).subscribe(
      {
        next:(value)=>{
          this.directoriesService.getSubDirectoryYear(this.subdirectoryYearData().subdirectoryId!);
          this.router.navigate(['/home/categories/subdirectory/', this.subdirectoryData().directoryId, 'years',this.subdirectoryYearData().subdirectoryId]);
        }
      }
    )
  }


  getTypeError(field: any, type: any) {
    return this.formSubDirectoryYear.get(field)?.invalid && this.formSubDirectoryYear.get(field)?.touched && this.formSubDirectoryYear.get(field)?.hasError(type)
  }

  getInputError(field: any){
    return this.formSubDirectoryYear.get(field)?.invalid && this.formSubDirectoryYear.get(field)?.touched
  }
}
