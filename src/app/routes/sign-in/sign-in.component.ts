import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  keepMeLogged: boolean = localStorage.getItem('keepMeLogged') ? true : false;
  constructor(
    private authService : AuthService,
  ) { }
  ngOnInit(): void {
    (document.getElementById('keep-me-logged') as HTMLInputElement).value = localStorage.getItem('keepMeLogged') || "off";
    if (this.keepMeLogged) {
      this.signIn('kml')
    }
  }
  signIn(method: string) {
    this.authService.signIn(method);
  }
  toggleKeepMeLogged(){
    console.log(this.keepMeLogged)
    if (this.keepMeLogged) {
      localStorage.setItem('keepMeLogged', 'on')
    } else {
      localStorage.removeItem('keepMeLogged')
    }
  }
}
