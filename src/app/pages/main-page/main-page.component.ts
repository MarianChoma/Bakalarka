import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {HttpResponse} from "@angular/common/http";
import {WebrequestService} from "../../webrequest.service";
import {TeamsService} from "../../teams.service";
import {catchError, first, shareReplay, take} from "rxjs/operators";
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

  compareClubInput(nazov: string) {
    const nazovUp = nazov.toUpperCase();
    this.teamService.compareClub(nazovUp).subscribe((team) => {
      console.log(team);
    });
  }

  onLogoutButtonClick() {
    this.authService.logout();
  }

  inputEmail() {
    const id = localStorage.getItem("user-id");
    let help;
    this.webRequest.getEmail(id).subscribe((email) => {
      help=JSON.stringify(email)
      const help2=JSON.parse(help);

      console.log(help);
      console.log(help2["email"]);
      document.getElementById("email").setAttribute('placeholder', `${help2["email"]}`);
    });
  }
}
