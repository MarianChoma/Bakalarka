import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";


@Component({
  selector: 'app-team-in-cup-view',
  templateUrl: './team-in-cup-view.component.html',
  styleUrls: ['./team-in-cup-view.component.scss']
})
export class TeamInCupViewComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  onLogoutButtonClick() {
    this.authService.logout();
  }
}
