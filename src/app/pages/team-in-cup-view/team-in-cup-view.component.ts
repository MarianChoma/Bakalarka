import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {WebrequestService} from "../../webrequest.service";


@Component({
  selector: 'app-team-in-cup-view',
  templateUrl: './team-in-cup-view.component.html',
  styleUrls: ['./team-in-cup-view.component.scss']
})
export class TeamInCupViewComponent implements OnInit {
  public teamCount=0;
  constructor(private authService:AuthService, private webRequest: WebrequestService) { }

  ngOnInit(): void {
    this.webRequest.get('teams/cup').subscribe(list => {
      if (list["team"].length !== 0) {
        this.teamCount = list["size"]
        console.log(list["size"])
      }
      else{
        this.teamCount=0
      }
    })
  }
  onLogoutButtonClick() {
    this.authService.logout();
  }
}
