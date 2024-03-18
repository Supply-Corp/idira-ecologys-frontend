import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '@environment/environment';
import { Directory, DirectoryResponse } from '@interfaces/directory';
import { Observable, of } from 'rxjs';

export interface DirectoryServiceData{
  loading:boolean,
  directories:Directory[],
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

  public directoryData = computed(() => this.#directoryData());

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

  getSubDirectory(id:number):Observable<Directory | null>{
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
}
