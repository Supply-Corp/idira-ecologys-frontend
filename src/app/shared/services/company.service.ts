import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '@environment/environment';
import { Company, CompanyResponse } from '@interfaces/companyResponse';
import { Observable, map, tap } from 'rxjs';

export interface CompanyServiceData{
  loading:boolean,
  companies:Company[],
}

@Injectable({
  providedIn: 'root'
})


export class CompanyService {


  private http = inject(HttpClient);
  private urlApi = environment.api;


  #companyData = signal<CompanyServiceData>({
    loading:false,
    companies:[],
  })

  public companyData = computed(() => this.#companyData());

  constructor() {
    this.#companyData().companies.length == 0 && this.get();
  }

  get() {
    this.#companyData.update(
      value=> ({...value, loading:true})
    );

    this.http.get<CompanyResponse>(`${this.urlApi}/company?page=1&limit=10`).subscribe((result)=>{
      this.#companyData.update(
        _=> ({companies:result.results, loading:false})
      );
    });
  }

  getCompany(id:number):Observable<Company>{
    this.#companyData.update(
      value=> ({...value, loading:true})
    );

    const response = this.http.get<Company>(`${this.urlApi}/company/${id}`);
    this.#companyData.update(
      value=> ({...value, loading:false})
    );
    return response;
  }

  updateCompany(id:number,data:any){
    this.#companyData.update(
      value=> ({...value, loading:true})
    );

    const response = this.http.put<Company>(`${this.urlApi}/company/${id}`,data);
    return response;
  }

  create(data: any) {

    this.#companyData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.post(`${this.urlApi}/company`, data);
    this.#companyData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }

  delete(id:number):Observable<Object>{
    this.#companyData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.delete(`${this.urlApi}/company/${id}`);
    this.#companyData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }
}
