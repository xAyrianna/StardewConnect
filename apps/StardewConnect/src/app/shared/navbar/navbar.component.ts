import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stardew-connect-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // set anchor element active based on current route
  activeRoute = window.location.pathname;

  ngOnInit(): void {
    console.log('Current route: ' + this.activeRoute);
  }
}
