import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WebrequestService {
  readonly ROOT_URL;

  constructor(private http:HttpClient) {
    this.ROOT_URL='http://localhost:3000';
  }
  homeAuthenticate(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }

  post(uri:string, payLoad: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`,payLoad);
  }

  getEmail(id:string){
    return this.http.post(`${this.ROOT_URL}/users/email`,{
        "id":id
    })/*.subscribe((email)=>{
      console.log(email);
    });*/
  }


  login(email: string, password:string){
    return this.http.post(`${this.ROOT_URL}/users/login`,{
      email,
      password
    }, {
      observe: 'response'
    });
  }

  signup(email: string, password:string){
    return this.http.post(`${this.ROOT_URL}/users`,{
      email,
      password
    }, {
      observe: 'response'
    });
  }


}
