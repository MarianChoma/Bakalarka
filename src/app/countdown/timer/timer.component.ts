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
  private dDay = new Date('04 05 2022 22:39:20');
  private timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;

  constructor(private webRequest: WebrequestService) {
  }

  async getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
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
          this.subscription.unsubscribe();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

