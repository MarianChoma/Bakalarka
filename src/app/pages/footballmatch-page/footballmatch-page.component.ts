import { Component, OnInit } from '@angular/core';
import {WebrequestService} from "../../webrequest.service";
import {TimerComponent} from "../../countdown/timer/timer.component";

@Component({
  selector: 'app-footballmatch-page',
  templateUrl: './footballmatch-page.component.html',
  styleUrls: ['./footballmatch-page.component.scss']
})
export class FootballmatchPageComponent implements OnInit {

  constructor(private webRequest: WebrequestService) { }
  public  footballMatches =[]
  public matchResults = [];
  public winnerTeams;
   ngOnInit(){
     (async () => {
       await this.webRequest.get('football-matches').subscribe(list => {
         this.footballMatches = list["matches"]
       })
       console.log(this.footballMatches)
       await this.webRequest.get('matchResults').subscribe(result => {
         this.matchResults = result["results"]
       })

       await this.webRequest.get('teams/cup').subscribe(list => {
         this.winnerTeams = list["team"]
         console.log(list["team"][0]["nazov"])
       })
     })();
  }
}
