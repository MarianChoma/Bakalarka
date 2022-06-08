import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, switchMap} from "rxjs/operators";
import {empty} from "rxjs/internal/Observer";

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

  get(uri:string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  getEmail(id:string){
    return this.http.post(`${this.ROOT_URL}/users/email`,{
        "id":id
    })
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


  sigUpTeamsToCup(nazov: string, liga: string) {
    return this.http.patch(`${this.ROOT_URL}/teams`, {
      "nazov": nazov,
      "liga": liga,
    })
  }

  submitMatch(matches){
    return this.http.post(`${this.ROOT_URL}/teams/proceed`,{
      teams:matches
    }).toPromise();
  }
}
