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
            console.log(this.user);
          });
        this.memberSince = this.user?.memberSince.toLocaleDateString();
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
}
