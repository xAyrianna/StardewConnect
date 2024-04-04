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

  mockUsers: User[] = [
    {
      username: 'test1',
      emailAddress: 'test@test.com',
      password: 'password',
      favoriteThing: 'test',
      name: 'test',
      birthday: new Date(),
      memberSince: new Date(),
    },
    {
      username: 'test2',
      emailAddress: 'test@test.com',
      password: 'password',
      favoriteThing: 'test',
      name: 'test',
      birthday: new Date(),
      memberSince: new Date(),
    },
    {
      username: 'test3',
      emailAddress: 'test@test.com',
      password: 'password',
      favoriteThing: 'test',
      name: 'test',
      birthday: new Date(),
      memberSince: new Date(),
    },
  ];

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
        () => (this.users = this.users?.filter((u) => u._id !== user._id))
      );
  }
}
