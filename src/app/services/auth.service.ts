import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup, signInWithCredential, OAuthCredential, User, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | undefined = undefined;
  get User(): User | undefined {
    return this.user
  }
  constructor(
    private router: Router,
    private auth: Auth,
  ) { }
  signIn(method: string) {
    switch (method) {
      case "Google":
        signInWithPopup(this.auth, new GoogleAuthProvider()).then((result) => {
          this.user = result.user;
          if (localStorage.getItem('keepMeLogged')) {
            localStorage.setItem('kmlIdToken', (GoogleAuthProvider.credentialFromResult(result) as OAuthCredential).idToken as string)
          }
          this.router.navigate(['/home'])
        }).catch((error) => {
          console.log(error)
        });
        break;
      case "kml":
        signInWithCredential(this.auth, GoogleAuthProvider.credential(localStorage.getItem('kmlIdToken') as string)).then((result)=>{
          this.user = result.user;
          this.router.navigate(['/home'])
        })
        break;
    }
  }
  logOut(){
    signOut(this.auth);
    this.user = undefined;
    if (localStorage.getItem('keepMeLogged')) {
      localStorage.removeItem('keepMeLogged');
      localStorage.removeItem('kmlIdToken')
    }
    this.router.navigate(['/signIn'])
  }
  checkSignedIn() {
    if (!this.router.url.includes('signIn') && this.user == undefined) {
      this.router.navigate(['/signIn'])
    }
  }
}
