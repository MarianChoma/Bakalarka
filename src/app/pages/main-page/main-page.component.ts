import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {HttpResponse} from "@angular/common/http";
import {WebrequestService} from "../../webrequest.service";
import {TeamsService} from "../../teams.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private teamService: TeamsService, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  compareClubInput(nazov:string){
    this.teamService.compareClub(nazov).subscribe((team)=>{
      console.log(team);
    });
  }

  onLogoutButtonClick() {
    this.authService.logout();
  }

  inputID(){
    return this.authService.getUserId();
  }
}
