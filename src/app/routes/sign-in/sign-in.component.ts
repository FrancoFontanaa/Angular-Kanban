import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(
    private auth: Auth,
    private router: Router
  ) { }
  async signIn() {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
    this.router.navigate(['/home']);
  }
}
