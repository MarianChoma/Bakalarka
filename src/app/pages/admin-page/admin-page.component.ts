import {Component, OnInit} from '@angular/core';
import {WebrequestService} from "../../webrequest.service";
import {TimerComponent} from "../../countdown/timer/timer.component";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  public footballMatches = [];
  //public matchResults = [];
  public matches;


  constructor(private webRequest: WebrequestService, private timer: TimerComponent) {

  }

   ngOnInit(){
     (async () => {
       await this.drawTeam();
     })();
  }

  async submitMatches() {
    document.getElementById("errorMessage").innerHTML = "";
    const losers = [];
    let canSubmit=false;
    for (let i = 0; i < this.footballMatches.length; i++) {
      let homeTeam = <HTMLInputElement>document.getElementById(this.footballMatches[i].home.nazov);
      let hostTeam = <HTMLInputElement>document.getElementById(this.footballMatches[i].host.nazov);
      if (homeTeam.value !== '' && hostTeam.value !== '') {
        canSubmit=true;
        this.footballMatches[i].home.score = homeTeam.value
        this.footballMatches[i].host.score = hostTeam.value
        losers.push([this.footballMatches[i].home, this.footballMatches[i].host])

      } else {
        document.getElementById("errorMessage").innerHTML = "Nezadali ste výsledok pre všetky zápasy";
        break;
      }
    }
    if(canSubmit) {
      await Promise.all([this.webRequest.submitMatch(losers), this.drawTeam()])
      return true;
    }
    return false;
  }
  async rewriteTable(){
    if(typeof await this.submitMatches()) {
      await this.drawTeam();
    }
  }

  async drawTeam() {
    if (this.timer["dDay"].getTime() - new Date().getTime() < 0) {
      this.matches = await this.webRequest.post('teams/draw', {
        time: this.timer["dDay"].getTime() - new Date().getTime()
      }).toPromise()

      await this.webRequest.get('football-matches').subscribe(list => {
        this.footballMatches = list["matches"]
        console.log(this.footballMatches[0].home)
      })
    }
  }
}
