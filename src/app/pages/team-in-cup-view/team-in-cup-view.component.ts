import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {WebrequestService} from "../../webrequest.service";

@Component({
  selector: 'app-team-in-cup-view',
  templateUrl: './team-in-cup-view.component.html',
  styleUrls: ['./team-in-cup-view.component.scss']
})
export class TeamInCupViewComponent implements OnInit {
  lists;
  constructor(private authService:AuthService, private webReq:WebrequestService) { }

  ngOnInit(): void {
    this.webReq.get('teams/cup').subscribe((list: any)=>{
      this.lists=list;
    });
  }
  onLogoutButtonClick() {
    this.authService.logout();
  }



}
