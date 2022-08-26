import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseManagerService } from 'src/app/services/database-manager.service';
import { MyUser } from 'src/assets/models';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(
    public router: Router,
    private authService: AuthService,
    private databaseManagerService: DatabaseManagerService
  ) {}
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user.displayName = user?.displayName || "Undefined";
      this.user.photoURL = user?.photoURL || "../../../assets/visuals/user-img-placeholder.svg";
      console.log(user?.photoURL)
    })
  }
  user: MyUser = {
    displayName: "Undefined",
    photoURL: "../../../assets/visuals/user-img-placeholder.svg"
  }
  toggleMenuBool = false;
  toggleMenu() {
    this.toggleMenuBool = !this.toggleMenuBool;
    this.databaseManagerService.createBoard();
  }
  copyInvitationCode() {
    alert('Invitation code copied to clipboard!')
  }
}
