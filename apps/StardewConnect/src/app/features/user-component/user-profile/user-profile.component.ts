import { User } from '@StardewConnect/libs/data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'stardew-connect-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy{
  user: User | undefined;
  subscription: Subscription | undefined;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.userService.getProfile().subscribe((response) => {
      this.user = response;
    });
  }
  ngOnDestroy(): void {
    console.log('destroying user-profile component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

}
