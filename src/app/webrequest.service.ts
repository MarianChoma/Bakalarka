import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebrequestService {
  readonly ROOT_URL;

  constructor(private http:HttpClient) {
    this.ROOT_URL='http://localhost:3000';
  }
  get(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
  post(uri:string, payLoad: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`,payLoad);
  }

  login(club: string, password:string){
    return this.http.post(`${this.ROOT_URL}/users/login`,{
      club,
      password
    }, {
      observe: 'response'
    });
  }

  signup(club: string, password:string){
    return this.http.post(`${this.ROOT_URL}/users`,{
      club,
      password
    }, {
      observe: 'response'
    });
  }

}
