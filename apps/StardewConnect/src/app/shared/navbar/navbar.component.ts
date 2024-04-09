import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../features/user-component/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stardew-connect-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  // set anchor element active based on current route
  activeRoute = window.location.pathname;
  loggedIn = false;
  loggedInUser: string | undefined;
  subscription: Subscription | undefined;

  constructor(private router: Router, private userService: UserService) {
    userService.userLoggedIn.subscribe((value) => {
      this.loggedIn = value;
      if(value) {
        const userId = localStorage.getItem('user_ID');
        if (userId) {
          this.subscription = this.userService
            .getUserByID(userId)
            .subscribe((response) => {
              console.log('Logged in user: ' + response.username);
              this.loggedInUser = response.username;
            });
        }
      } else {
        this.loggedInUser = undefined;
      }
    });
  }

  ngOnInit(): void {
    console.log('Current route: ' + this.activeRoute);
    if (localStorage.getItem('access_token')) {
      this.loggedIn = true;
    }
  }

  ngOnDestroy(): void {
    console.log('destroying event-list component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  logout(): void {
    console.log('Logging out');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_ID');
    this.loggedIn = false;
    this.loggedInUser = undefined;
    this.router.navigate(['/login']);
  }
}
