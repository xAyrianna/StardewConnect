import { User } from '@StardewConnect/libs/data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'stardew-connect-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  componentId: string | null | undefined;
  user: User | undefined;
  subscription: Subscription | undefined;
  memberSince: string | undefined;
  loggedInUser: string | null = localStorage.getItem('user_ID');
  isFollowing: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        this.subscription = this.userService
          .getUserByUsername(this.componentId)
          .subscribe((response) => {
            this.user = response;
            const date = new Date(response.memberSince);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
            const year = date.getFullYear();
            this.memberSince = `${day}/${month}/${year}`;

            this.subscription = this.userService
              .checkIfFollowing(this.user.username)
              .subscribe((response) => {;
                this.isFollowing = response;
              });
          });
      } else {
        console.log('Nieuwe component');
      }
    });
  }

  ngOnDestroy(): void {
    console.log('destroying user-detail component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  deleteUser() {
    console.log('deleting user');
    if (this.user === undefined) {
      return;
    }
    this.userService
      .deleteUser(this.user)
      .subscribe();
    this.router.navigate(['/user']);
  }

  follow() {
    if (this.user) {
      this.subscription = this.userService
        .followUser(this.user?.username)
        .subscribe((response) => {
          this.isFollowing = true;
        });
    }
  }

  unfollow() {
    if (this.user) {
      this.subscription = this.userService
        .unfollowUser(this.user?.username)
        .subscribe((response) => {
          this.isFollowing = false;
        });
    }
  }
}
