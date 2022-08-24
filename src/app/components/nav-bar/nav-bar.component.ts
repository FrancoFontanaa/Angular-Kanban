import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(
    readonly router : Router
  ) {}
  ngOnInit(): void {
  }
  user = {
    name: "Juan"
  }
  toggleMenuBool = true;
  toggleMenu() {
    this.toggleMenuBool = !this.toggleMenuBool
  }

}
