import { User } from '@StardewConnect/libs/data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stardew-connect-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] | undefined;
  subscription: Subscription | undefined;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
      console.log(this.users);
    });
  }

  ngOnDestroy(): void {
    console.log('destroying user-list component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  deleteUser(user: User) {
    console.log('deleting user');
    this.userService
      .deleteUser(user)
      .subscribe(
        () => (this.users = this.users?.filter((u) => u.id !== user.id))
      );
  }
}

