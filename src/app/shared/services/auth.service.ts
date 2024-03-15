import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '@environment/environment';


export interface AuthDataService{
  loading:boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private urlApi = environment.api;


  #authData = signal<AuthDataService>({
    loading:false,
  })

  public authData = computed(() => this.#authData());

  login(data: any) {

    this.#authData.update(
      value=> ({loading:true})
    );
    const result = this.http.post(`${this.urlApi}/auth/login`, data);
    this.#authData.update(
      value=> ({loading:false})
    );
    return result;
  }

}
