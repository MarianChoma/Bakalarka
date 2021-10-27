import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignupButtonClick(club: string, password: string){
    this.authService.signup(club, password).subscribe((res: HttpResponse<any>) =>{
      console.log(res);
    });
  }

}
