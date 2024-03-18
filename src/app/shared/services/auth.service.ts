import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  private router = inject(Router);
  private urlApi = environment.api;

  constructor(){
    console.log('asd')
    this.getUserData()
  }


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
        console.log(value)
        this.#authData.update(data=> ({...data, user:value.user}))
      })
    );
    this.#authData.update(
      value=> ({...value,loading:false})
    );
    return result;
  }

  getUserData(){
    const token = localStorage.getItem('token');
    // const headers = { 'Authorization': `Bearer ${token}` }
    const headers = { 'Authorization': `Bearer ${token}` }
    console.log(`Bearer ${token}`)

    this.#authData.update(
      value=> ({...value,loading:true})
    );

    this.http.get(`${this.urlApi}/auth/user`,{
      headers
    }).pipe(
      tap((value:any)=>{
        console.log(` data ${value}`)
        this.#authData.update(data=> ({...data, user:value}))
      })
    ).subscribe({
      error:()=>{
        this.logout()
      }
    });
    this.#authData.update(
      value=> ({...value,loading:false})
    );
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/')
  }

}
