import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DirectoriesService, DirectoryServiceData } from '@services/directories.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-directory-manage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './directory_manage.component.html',
  styleUrl: './directory_manage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DirectoryManageComponent {


  private formBuilder = inject(FormBuilder);
  private directoryService = inject(DirectoriesService);
  public router = inject(Router);
  private routeActive = inject(ActivatedRoute);

  public directoryData = computed<DirectoryServiceData>(()=>this.directoryService.directoryData());

  directory = toSignal(
    this.routeActive.params.pipe(
      switchMap(({ id }) => this.directoryService.getDirectory(id).pipe(
        tap(data=>{
          if(data){
            this.form.patchValue(data!);
          }
        })
      )),
    )
  );

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
  })

  createDirectory(){
    if (
      this.form.invalid
    ) {
      this.form.markAllAsTouched();
      return;
    }
    this.directoryService.create(this.form.value).subscribe(
      {
        next:(value)=>{
          this.directoryService.get();
          this.router.navigate(['/home/categories']);
        }
      }
    )
  }

  updateDirectory(){
    if (
      this.form.invalid
    ) {
      this.form.markAllAsTouched();
      return;
    }
    this.directoryService.update(this.directory()!.id,this.form.value).subscribe(
      {
        next:(value)=>{
          this.directoryService.get();
          this.router.navigate(['/home/categories']);
        }
      }
    )
  }

  getTypeError(field: any, type: any) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched && this.form.get(field)?.hasError(type)
  }

  getInputError(field: any){
    return this.form.get(field)?.invalid && this.form.get(field)?.touched
  }
 }
