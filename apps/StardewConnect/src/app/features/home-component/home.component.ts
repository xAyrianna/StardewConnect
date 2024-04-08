import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user-component/user.service';
import { User } from '@StardewConnect/libs/data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stardew-connect-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  recommendedOfFollowing: User[] | undefined;
  recommendedOfFriendship: User[] | undefined;
  subscription: Subscription | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.getRecommendedOfFollowing().subscribe((response) => {
      this.recommendedOfFollowing = response;
    });
    this.subscription = this.userService.getRecommendedOfFriendship().subscribe((response) => {
      this.recommendedOfFriendship = response;
    });
  }

  ngOnDestroy(): void {
    console.log('destroying user-detail component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
