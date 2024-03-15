import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '@environment/environment';
import { User } from '@interfaces/user';
import { tap } from 'rxjs';


export interface AuthDataService{
  loading:boolean,
  user:User | null
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private urlApi = environment.api;


  #authData = signal<AuthDataService>({
    user: null,
    loading:false,
  })

  public authData = computed(() => this.#authData());

  login(data: any) {

    this.#authData.update(
      value=> ({...value,loading:true})
    );
    const result = this.http.post(`${this.urlApi}/auth/login`, data).pipe(
      tap((value:any)=>{
        localStorage.setItem('token', value?.token)
        this.#authData.update(value=> ({...value, user:value.user}))
      })
    );
    this.#authData.update(
      value=> ({...value,loading:false})
    );
    return result;
  }

}
