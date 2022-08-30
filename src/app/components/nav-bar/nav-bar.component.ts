import { Component, OnInit } from '@angular/core';
import { Auth, user, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(
    public router: Router,
    private auth: Auth
  ){}

  toggleMenuBool = false;
  user = {
    displayName: "Undefined",
    photoURL: "../../../assets/visuals/user-img-placeholder.svg",
    recent: {
      color: "white",
      title: "Undefined"
    }
  };

  ngOnInit(): void {
    user(this.auth).subscribe(userdata => {
      this.user.displayName = userdata?.displayName as string;
      this.user.photoURL = userdata?.photoURL as string;
    })
  }

  toggleMenu() {
    this.toggleMenuBool = !this.toggleMenuBool;
  }

  addMember() {
    alert('Work in progress')
  }

  logOut(){
    signOut(this.auth);
    this.router.navigate(['/signIn'])
  }
}
