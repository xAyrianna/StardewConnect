import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Town, User } from '@StardewConnect/libs/data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stardew-connect-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  componentId: string | null | undefined;
  componentExists: boolean | undefined;
  user: User | undefined;
  subscription: Subscription | undefined;
  userName: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        console.log('Bestaande component');
        this.componentExists = true;
        // Haal de bestaande user uit het array
        //functie toevoegen!
        this.subscription = this.userService
          .getUserByUsername(this.componentId)
          .subscribe((response) => {
            this.user = { ...response }; //spread
            this.userName = response.name;
          });
      } else {
        console.log('Nieuwe component');
        this.componentExists = false;
        // geen bestaande user, dus nieuw object maken
        this.user = {
          _id: undefined,
          username: '',
          name: '',
          emailAddress: '',
          memberSince: new Date(),
          birthday: new Date(),
          password: '',
          favoriteThing: '',
          towns: [],
        };
      }
    });
  }

  ngOnDestroy(): void {
    console.log('destroying user-edit component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  async onSubmit() {
    console.log('Submitting the form');
    // User toevoegen aan UserArray
    if (this.componentExists) {
      // update bestaande entry
      console.log('editting user');
      (await this.userService.updateUser(this.user!)).subscribe();
    } else {
      // nieuwe user toevoegen aan array
      console.log('adding user');
      (await this.userService.registerUser(this.user!)).subscribe();
    }
    this.router.navigate(['user']);
  }
}
