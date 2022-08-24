import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(
    private authService : AuthService,
    private router : Router
  ) { }
  ngOnInit(): void {
  }
  signIn() {
    this.authService.signIn();
  }
}
