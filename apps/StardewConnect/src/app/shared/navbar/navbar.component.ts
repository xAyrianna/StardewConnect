import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../features/user-component/user.service';

@Component({
  selector: 'stardew-connect-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // set anchor element active based on current route
  activeRoute = window.location.pathname;
  loggedIn = false;
  
  constructor(private router: Router, userService: UserService) {
    userService.userLoggedIn.subscribe((value) => {
      this.loggedIn = value;
    });
  }

  ngOnInit(): void {
    console.log('Current route: ' + this.activeRoute);
    if (localStorage.getItem('access_token')) {
      this.loggedIn = true;
    }
  }

  logout(): void {
    console.log('Logging out');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_ID');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
