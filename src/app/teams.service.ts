import { Injectable } from '@angular/core';
import {WebrequestService} from "./webrequest.service";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private WebReqService: WebrequestService){ }

  compareClub(nazov:string){
    //send webrequest to create list
    return this.WebReqService.post('teams', {nazov});
  }
}
