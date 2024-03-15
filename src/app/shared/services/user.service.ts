import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '@environment/environment';
import { User, UserResponse } from '@interfaces/user';
import { Observable, of } from 'rxjs';


export interface UserServiceData{
  loading:boolean,
  users:User[],
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
    this.#userData().users.length == 0 && this.getUsers();
  }

  private http = inject(HttpClient);
  private urlApi = environment.api;

  #userData = signal<UserServiceData>({
    loading:false,
    users:[],
  })
  public userData = computed(() => this.#userData());


  getUsers(){

    this.#userData.update(
      value=> ({...value, loading:true})
    );

    this.http.get<UserResponse>(`${this.urlApi}/users?page=1&limit=10`).subscribe((result)=>{
      this.#userData.update(
        _=> ({users:result.results, loading:false})
      );
    });
  }

  getById(id:number):Observable<User | null>{
    if(!id){return of(null)};

    this.#userData.update(
      value=> ({...value, loading:true})
    );

    const response = this.http.get<User>(`${this.urlApi}/users/${id}`);
    this.#userData.update(
      value=> ({...value, loading:false})
    );
    return response;
  }

  create(data:any){
    this.#userData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.post(`${this.urlApi}/users`, {...data});
    this.#userData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }

  update(id:number,data:any){
    this.#userData.update(
      value=> ({...value, loading:true})
    );

    const response = this.http.put<User>(`${this.urlApi}/users/${id}`,data);
    return response;
  }

  delete(id:number):Observable<Object>{
    this.#userData.update(
      value=> ({...value, loading:true})
    );
    const result = this.http.delete(`${this.urlApi}/users/${id}`);
    this.#userData.update(
      value=> ({...value, loading:false})
    );
    return result;
  }
}
