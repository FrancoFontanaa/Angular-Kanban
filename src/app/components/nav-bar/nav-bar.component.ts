import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(
    readonly router : Router,
    private authService : AuthService
  ) {}
  user = {
    displayName: this.authService.User?.displayName as string || "Undefined",
    photoURL: this.authService.User?.photoURL as string || "../../../assets/visuals/user-img-placeholder.svg",
    logOut: ()=>{this.authService.logOut()}
  }
  toggleMenuBool = false;
  toggleMenu() {
    console.log(this.authService.User?.photoURL)
    this.toggleMenuBool = !this.toggleMenuBool
  }

}
