import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '@environment/environment';
import { Sede, SedePayload, SedeResponse } from '@interfaces/sedes';
import { Observable, map } from 'rxjs';


export interface SedeServiceData{
  loading:boolean,
  sedes:Sede[],
  companyId:number | null
}

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  private http = inject(HttpClient);
  private urlApi = environment.api;


  #sedeData = signal<SedeServiceData>({
    loading:false,
    sedes:[],
    companyId:null
  })

  public sedeData = computed(() => this.#sedeData());


  getSedesById(id:number):Observable<Sede[]>{
    this.#sedeData.update(
      value=> ({...value, loading:true, companyId:id})
    );

    return this.http.get<SedeResponse>(`${this.urlApi}/sede/${id}?page=1&limit=10`)
      .pipe(
        map(
          data=> {
            this.#sedeData.update(
              value=> ({...value,loading:false, sedes: data.results})
            );
            return data.results
          }
        )
      )
  }

  create(data:any){
    this.#sedeData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.post(`${this.urlApi}/sede`, {...data, companyId: parseInt(data.companyId)});
    this.#sedeData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }

  delete(id:number):Observable<Object>{
    this.#sedeData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.delete(`${this.urlApi}/sede/${id}`);
    this.#sedeData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }

}
