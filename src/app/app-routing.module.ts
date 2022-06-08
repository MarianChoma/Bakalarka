import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SignupPageComponent} from "./pages/signup-page/signup-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {InfoPageComponent} from "./pages/info-page/info-page.component";
import {TeamInCupViewComponent} from "./pages/team-in-cup-view/team-in-cup-view.component";
import {FootballmatchPageComponent} from "./pages/footballmatch-page/footballmatch-page.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'home', component: MainPageComponent},
  {path: 'home/teams', component: TeamInCupViewComponent},
  {path: 'home/info', component: InfoPageComponent},
  {path: 'football-matches', component: FootballmatchPageComponent},
  {path: 'admin', component: AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
