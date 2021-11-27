import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {HttpResponse} from "@angular/common/http";
import {WebrequestService} from "../../webrequest.service";
import {TeamsService} from "../../teams.service";
import {catchError, first, mergeScan, shareReplay, take} from "rxjs/operators";
import {Subscriber} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  constructor(private teamService: TeamsService, private authService: AuthService, private webRequest: WebrequestService) {
  }

  ngOnInit(): void {
    this.authService.auth('home').subscribe((e) => {
      console.log(e);
    });
    this.inputEmail();
  }

  signToCup(team: string){
    const nazovUp = team.toUpperCase();
    return this.webRequest.sigUpTeamsToCup(nazovUp).subscribe((meassage)=>{
      console.log(meassage)
    });
  }

  onLogoutButtonClick() {
    this.authService.logout();
  }

  inputEmail() {
    const id = localStorage.getItem("user-id");
    let help;
    this.webRequest.getEmail(id).subscribe((email) => {
      console.log(email);
      help=JSON.stringify(email)
      const help2=JSON.parse(help);

      console.log(help);
      console.log(help2["email"]);
      document.getElementById("email").setAttribute('placeholder', `${email["email"]}`);
    });
  }
}
