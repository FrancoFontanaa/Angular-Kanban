import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  signedIn = false;
  signIn() {
    this.signedIn = true;
  }
}
