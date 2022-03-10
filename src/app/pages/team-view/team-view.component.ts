import { Component, OnInit } from '@angular/core';
import {WebrequestService} from "../../webrequest.service";

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {
  lists;

  constructor(private webRequest: WebrequestService) { }

  ngOnInit(): void {
   this.webRequest.get('teams/cup').subscribe(list=>{
     if(list["length"]!==0){
       this.lists=list
     }
    else{
      this.lists=undefined
     }
   })
  }


}