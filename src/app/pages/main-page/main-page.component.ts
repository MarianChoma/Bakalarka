import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {HttpErrorResponse, HttpRequest, HttpResponse} from "@angular/common/http";
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


  constructor(private authService: AuthService, private webRequest: WebrequestService) {
  }

  ngOnInit(): void {
    this.authService.auth('home').subscribe((e) => {
      console.log(e);
    });
    this.inputEmail();
  }

  signToCup(team: string) {
    const nazovUp = team.toUpperCase();
    const c = this.webRequest.sigUpTeamsToCup(nazovUp)
    c.subscribe(data => {
        console.log(data)
      },
      error => {
        let errormessage = document.getElementById("errormessage")
        if (error.status === 404) {
          errormessage.innerHTML = "nesprávny názov týmu"
          document.getElementsByClassName("container")[0].appendChild(errormessage);
        } else {

          errormessage.innerHTML=''
          document.getElementsByClassName("container")[0].appendChild(errormessage);
          console.log(1)
        }
      })
  }

  onLogoutButtonClick() {
    this.authService.logout();
  }

  inputEmail() {
    const id = localStorage.getItem("user-id");
    let help;
    this.webRequest.getEmail(id).subscribe((email) => {
      console.log(email);
      help = JSON.stringify(email)
      const help2 = JSON.parse(help);

      console.log(help);
      console.log(help2["email"]);
      document.getElementById("email").setAttribute('placeholder', `${email["email"]}`);
    });
  }
}
