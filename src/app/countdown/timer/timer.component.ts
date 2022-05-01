import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {WebrequestService} from "../../webrequest.service";



@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private dDay = new Date('04 01 2022 23:39:20');
  private timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;
  public matches;

  constructor(private webRequest: WebrequestService) {
  }

  async getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
    console.log(this.timeDifference)
  }
  async drawTeam(){
    if (this.timeDifference < 0) {
      this.matches= await this.webRequest.get('teams/draw').toPromise()
    }
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor((timeDifference) / (1000) % 60);
    this.minutesToDday = Math.floor((timeDifference) / (1000 * 60) % 60);
    this.hoursToDday = Math.floor((timeDifference) / (1000 * 60 * 60) % 24);
    this.daysToDday = Math.floor((timeDifference) / (1000 * 60 * 60 * 24));
  }

  ngOnInit() {
    this.subscription = interval(1000)
      .subscribe(x => {
        this.getTimeDifference();
        if(this.timeDifference < 0){
          this.drawTeam();
          this.subscription.unsubscribe();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

