import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserCredentials } from '@StardewConnect/libs/data';
import { Subscription } from 'rxjs';
import { UserService } from '../user-component/user.service';

@Component({
  selector: 'stardew-connect-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  credentials: UserCredentials = {
    username: '',
    password: '',
  };
  error: string | undefined;
  subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    console.log('destroying login component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    console.log('Submitting the form');
    if (
      this.credentials?.username.length > 4 &&
      this.credentials?.password.length > 6
    ) {
      this.subscription = this.userService
        .login(this.credentials)
        .subscribe({
          next: (result: any) => {
            if (result.access_token) {
              this.router.navigate(['/home']);
            }
          },
          error: (error: any) => {
            console.log('Error:', error);
            this.error = "Invalid credentials"
          }
        });
    } else {
      this.error = 'Please enter a valid username and password';
    }
  }
}
