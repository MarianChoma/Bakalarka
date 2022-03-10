import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {WebrequestService} from "../../webrequest.service";
import {Email} from "../../../assets/smtp";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  selectedOptions: string;

  items =[
    {value: '3. liga', name: '3. liga'},
    {value: '4. liga', name: '4. liga'},
    {value: '5. liga', name: '5. liga'},
    {value: '1. trieda', name: '1. trieda'},
    {value: '2. trieda', name: '2. trieda'},
  ]


  constructor(private authService: AuthService, private webRequest: WebrequestService) {
  }

  ngOnInit(): void {
    this.authService.auth('home').subscribe((e) => {
      console.log(e);
    });
    this.inputEmail();
  }

  onSubmit() {

    Email.send({
      SecureToken: "18afb8fe-566a-4e34-83ac-b8903cc19182 ",
      To: 'slovakcup.sk@gmail.com',
      From: "slovakcup.sk@gmail.com",
      Subject: "Prihlásenie do Slovak Cup",
      Body: `
      <h2>Prihlásený nový team</h2><br>
      <p>
      <b>Názov teamu:</b> ${(<HTMLInputElement>document.getElementById('team')).value}<br>
      <b>Liga:</b> ${this.selectedOptions}<br>
      <b>Email:</b> ${(<HTMLInputElement>document.getElementById('email')).value}<br>
      <b>Poštová adresa:</b> ${(<HTMLInputElement>document.getElementById('adress')).value}
       </p>`
    })
//189596
    Email.send({
      SecureToken: "18afb8fe-566a-4e34-83ac-b8903cc19182 ",
      To: `${(<HTMLInputElement>document.getElementById('email')).value}`,
      From: "slovakcup.sk@gmail.com",
      Subject: "Prihlásenie do Slovak Cup",
      Body: `
      <h2>Váš tím ${(<HTMLInputElement>document.getElementById('team')).value} bol úspešne prihlásený do Slovak Cupu.</h2><br>
      <p>Budeme Vás kontaktovať ak prebehne žrebovanie a oznámíme Vám súpera prvého kola.<br>
      V prípade ďalších otázok nás neváhajte kontaktovať na slovakcup.sk@gmail.com.</p>
      `
    }).then((message)=>{
      alert(message)
    })
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
          document.getElementById("error-container").appendChild(errormessage);
        } else {
          this.onSubmit()
          errormessage.innerHTML = ''
          document.getElementById("error-container").appendChild(errormessage);
        }
      })
  }

  onLogoutButtonClick() {
    this.authService.logout();
  }

  inputEmail() {
    const id = localStorage.getItem("user-id");
    this.webRequest.getEmail(id).subscribe((email) => {
      document.getElementById("email").setAttribute('placeholder', `${email["email"]}`);
      (<HTMLInputElement>document.getElementById('email')).value = email["email"];

    });
  }
}
