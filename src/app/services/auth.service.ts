import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup, User, signOut } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | undefined = undefined;
  get User() {
    return this.user
  }
  user$ = new BehaviorSubject<User | undefined>(this.user);
  constructor(
    private router: Router,
    private auth: Auth,
  ) { }
  signIn() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then((result) => {
      this.user = result.user;
      this.user$.next(this.user);
      this.router.navigate(['/home'])
    }).catch((error) => {
      console.log(error)
    });
  }
  logOut(){
    signOut(this.auth);
    this.user = undefined;
    this.router.navigate(['/signIn'])
  }
}
