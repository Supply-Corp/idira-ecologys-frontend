import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Directory, SubDirectory, SubDirectoryYear } from '@interfaces/directory';
import { DirectoriesService } from '@services/directories.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinner
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocumentsComponent {

  private directoryService = inject(DirectoriesService);
  public directoryData = this.directoryService.directoryData;
  public loading = signal<boolean>(false);
  dataSource = computed<Directory[]>(()=>this.directoryData().directories);

  public documentId = signal<number | null>(null);
  public directory = signal<Directory|null>(null);
  public subdirectory = signal<SubDirectory|null>(null);
  public subDirectories = signal<SubDirectory[] | null>(null);
  public subDirectoriesYear = signal<SubDirectoryYear[] | null>(null);

  getSubDocument(data:Directory){
    this.loading.set(true)
    this.directory.set(data)
    this.directoryService.getSubDirectory(data.id)
    .subscribe(
      value=>{
        this.subDirectories.set(value)
        console.log(value)
        this.loading.set(false)
      }
    )
  }

  returnToDirectory(){
    this.directory.set(null)
    this.subDirectories.set(null)
  }

  returnToSubDirectory(){
    this.subDirectoriesYear.set(null)
    this.subdirectory.set(null)
  }

  getSubDocumentYear(data:SubDirectory){
    this.loading.set(true);
    this.subdirectory.set(data);
    this.directoryService.getSubDirectoryYear(data.id)
    .subscribe(
      value=>{
        this.subDirectoriesYear.set(value)
        console.log(value)
        this.loading.set(false)
      }
    )
  }

}
