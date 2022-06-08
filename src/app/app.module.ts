import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {WebReqInterceptor} from "./web-req.interceptor";
import { TeamViewComponent } from './pages/team-view/team-view.component';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { TeamInCupViewComponent } from './pages/team-in-cup-view/team-in-cup-view.component';
import {FormsModule} from "@angular/forms";
import { TimerComponent } from './countdown/timer/timer.component';
import { FootballmatchPageComponent } from './pages/footballmatch-page/footballmatch-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    MainPageComponent,
    TeamViewComponent,
    InfoPageComponent,
    TeamInCupViewComponent,
    TimerComponent,
    FootballmatchPageComponent,
    AdminPageComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true },
    TimerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
