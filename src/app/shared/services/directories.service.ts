import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '@environment/environment';
import { Directory, DirectoryResponse, SubDirectory, SubDirectoryResponse, SubDirectoryYear, SubDirectoryYearResponse } from '@interfaces/directory';
import { Observable, map, of } from 'rxjs';

export interface DirectoryServiceData{
  loading:boolean,
  directories:Directory[],
}

export interface SubDirectoryServiceData{
  loading:boolean,
  subdirectory:SubDirectory[],
  directoryId:number | null
}

export interface SubDirectoryYearServiceData{
  loading:boolean,
  subdirectoryYear:SubDirectoryYear[],
  subdirectoryId:number | null
}

@Injectable({
  providedIn: 'root'
})

export class DirectoriesService {


  private http = inject(HttpClient);
  private urlApi = environment.api;


  #directoryData = signal<DirectoryServiceData>({
    loading:false,
    directories:[],
  })

  #subDirectoryData = signal<SubDirectoryServiceData>({
    loading:false,
    subdirectory:[],
    directoryId:null
  })

  #subDirectoryYearData = signal<SubDirectoryYearServiceData>({
    loading:false,
    subdirectoryYear:[],
    subdirectoryId:null
  })

  public directoryData = computed(() => this.#directoryData());
  public subDirectoryData = computed(() => this.#subDirectoryData());
  public subDirectoryYearData = computed(() => this.#subDirectoryYearData());

  constructor() {
    this.#directoryData().directories.length == 0 && this.get();
  }

  get() {
    this.#directoryData.update(
      value=> ({...value, loading:true})
    );

    this.http.get<DirectoryResponse>(`${this.urlApi}/directory?page=1&limit=10`).subscribe((result)=>{
      this.#directoryData.update(
        _=> ({directories:result.results, loading:false})
      );
    });
  }

  getDirectory(id:number):Observable<Directory | null>{
    if(!id){return of(null)};
    this.#directoryData.update(
      value=> ({...value, loading:true})
    );

    const response = this.http.get<Directory>(`${this.urlApi}/directory/${id}`);
    this.#directoryData.update(
      value=> ({...value, loading:false})
    );
    return response;
  }

  create(data: any) {

    this.#directoryData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.post(`${this.urlApi}/directory`, data);
    this.#directoryData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }

  update(id:number,data:any){
    this.#directoryData.update(
      value=> ({...value, loading:true})
    );

    const response = this.http.put<Directory>(`${this.urlApi}/directory/${id}`,data);
    return response;
  }


  delete(id:number):Observable<Object>{
    this.#directoryData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.delete(`${this.urlApi}/directory/${id}`);
    this.#directoryData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }



  getSubDirectory(id:number):Observable<SubDirectory[] | null>{
    if(!id){return of(null)};
    this.#subDirectoryData.update(
      value=> ({...value, loading:true, directoryId:id})
    );
    return this.http.get<SubDirectoryResponse>(`${this.urlApi}/subdirectory/directory/${id}?page=1&limit=10`)
    .pipe(
      map(
        data=> {
          this.#subDirectoryData.update(
            value=> ({...value,loading:false, subdirectory: data.results})
          );
          return data.results
        }
      )
    )
  }

  getSubDirectoryById(id:number):Observable<SubDirectory | null>{
    if(!id){return of(null)};
    this.#directoryData.update(
      value=> ({...value, loading:true})
    );

    const response = this.http.get<SubDirectory>(`${this.urlApi}/subdirectory/${id}`);
    this.#directoryData.update(
      value=> ({...value, loading:false})
    );
    return response;
  }

  createSubDirectory(data: any) {

    this.#subDirectoryData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.post(`${this.urlApi}/subdirectory`, {...data, directoryId: parseInt(data.directoryId)});
    this.#subDirectoryData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }

  updateSubDirectory(id:number,data:any){
    this.#subDirectoryData.update(
      value=> ({...value, loading:true})
    );

    const response = this.http.put<Directory>(`${this.urlApi}/subdirectory/${id}`, {...data, directoryId: parseInt(data.directoryId)});
    return response;
  }

  deleteSubDirectory(id:number):Observable<Object>{
    this.#subDirectoryData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.delete(`${this.urlApi}/subdirectory/${id}`);
    this.#subDirectoryData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }


  getSubDirectoryYear(id:number):Observable<SubDirectoryYear[] | null>{
    if(!id){return of(null)};
    this.#subDirectoryYearData.update(
      value=> ({...value, loading:true, subdirectoryId:id})
    );
    return this.http.get<SubDirectoryYearResponse>(`${this.urlApi}/subdirectory-years/subdirectory/${id}?page=1&limit=10`)
    .pipe(
      map(
        data=> {
          this.#subDirectoryYearData.update(
            value=> ({...value,loading:false, subdirectoryYear: data.results})
          );
          return data.results
        }
      )
    )
  }

  getSubDirectoryYearById(id:number):Observable<SubDirectoryYear | null>{
    if(!id){return of(null)};
    this.#subDirectoryYearData.update(
      value=> ({...value, loading:true})
    );

    const response = this.http.get<SubDirectoryYear>(`${this.urlApi}/subdirectory-years/${id}`);
    this.#subDirectoryYearData.update(
      value=> ({...value, loading:false})
    );
    return response;
  }

  createSubDirectoryYear(data: any) {

    this.#subDirectoryYearData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.post(`${this.urlApi}/subdirectory-years`, {...data, subDirectoryId: parseInt(data.subDirectoryId)});
    this.#subDirectoryYearData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }

  updateSubDirectoryYear(id:number,data:any){
    this.#subDirectoryYearData.update(
      value=> ({...value, loading:true})
    );

    const response = this.http.put<SubDirectoryYear>(`${this.urlApi}/subdirectory-years/${id}`, {...data, subDirectoryId: parseInt(data.subDirectoryId)});
    return response;
  }

  deleteSubDirectoryYear(id:number):Observable<Object>{
    this.#subDirectoryData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.delete(`${this.urlApi}/subdirectory-years/${id}`);
    this.#subDirectoryData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }


}
