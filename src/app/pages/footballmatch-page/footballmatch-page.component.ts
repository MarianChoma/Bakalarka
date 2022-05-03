import { Component, OnInit } from '@angular/core';
import {WebrequestService} from "../../webrequest.service";

@Component({
  selector: 'app-footballmatch-page',
  templateUrl: './footballmatch-page.component.html',
  styleUrls: ['./footballmatch-page.component.scss']
})
export class FootballmatchPageComponent implements OnInit {

  constructor(private webRequest: WebrequestService) { }
  public  footballMatches =[]
  ngOnInit(): void {
    this.webRequest.get('football-matches').subscribe(list=>{
        this.footballMatches=list["matches"]

        console.log(this.footballMatches[0].home.nazov)


    })
  }

}
