import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(
    private auth: Auth,
    private router: Router,
    private dbs: DatabaseService
  ) { }

  signIn() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then(()=>{
      if(localStorage.getItem("isNewDevice") == null) {
        this.dbs.saveUserProfileData().then(()=>{
          localStorage.setItem("isNewDevice", "false");
          this.router.navigate(['/home']);
        }).catch(error => {
          alert(error)
        })
      } else {
        this.router.navigate(['/home']);
      }
    }).catch(error => {
      alert(error)
    })
  }
}
