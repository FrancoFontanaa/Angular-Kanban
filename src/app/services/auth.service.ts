import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router
  ) { }
  signedIn = false;
  signIn() {
    this.signedIn = true;
  }
  checkSignedIn() {
    if (!this.router.url.includes('signIn') && this.signedIn == false) {
      this.router.navigate(['/signIn'])
    }
  }
}
