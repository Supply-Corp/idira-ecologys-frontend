import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DirectoriesService, SubDirectoryServiceData } from '@services/directories.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-sub-directory-manage',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './sub-directory_manage.component.html',
  styleUrl: './sub-directory_manage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SubDirectoryManageComponent {


  private formBuilder = inject(FormBuilder);
  public router = inject(Router);
  private routeActive = inject(ActivatedRoute);
  private directoriesService = inject(DirectoriesService);

  public subdirectoryData = computed<SubDirectoryServiceData>(()=>this.directoriesService.subDirectoryData());

  sede = toSignal(
    this.routeActive.params.pipe(
      switchMap(({ subDirId }) => this.directoriesService.getSubDirectoryById(subDirId).pipe(
        tap(data=>{
          if(data){
            this.formSubDirectory.patchValue(data!);
          }
        })
      )),
    )
  );

  formSubDirectory = this.formBuilder.group({
    name: ['', [Validators.required]],
    directoryId:[this.subdirectoryData().directoryId!]
  })

  create(){
    if (
      this.formSubDirectory.invalid
    ) {
      this.formSubDirectory.markAllAsTouched();
      return;
    }
    this.directoriesService.createSubDirectory(this.formSubDirectory.value).subscribe(
      {
        next:(value)=>{
          this.directoriesService.getSubDirectory(this.subdirectoryData().directoryId!);
          this.router.navigate(['/home/categories/subdirectory/',this.subdirectoryData().directoryId]);
        }
      }
    )
  }

  update(){
    if (
      this.formSubDirectory.invalid
    ) {
      this.formSubDirectory.markAllAsTouched();
      return;
    }
    this.directoriesService.updateSubDirectory(this.sede()!.id,this.formSubDirectory.value).subscribe(
      {
        next:(value)=>{
          this.directoriesService.getSubDirectory(this.subdirectoryData().directoryId!).subscribe();
          this.router.navigate(['/home/categories/subdirectory/',this.subdirectoryData().directoryId]);

        }
      }
    )
  }


  getTypeError(field: any, type: any) {
    return this.formSubDirectory.get(field)?.invalid && this.formSubDirectory.get(field)?.touched && this.formSubDirectory.get(field)?.hasError(type)
  }

  getInputError(field: any){
    return this.formSubDirectory.get(field)?.invalid && this.formSubDirectory.get(field)?.touched
  }
}
