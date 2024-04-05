import { User } from '@StardewConnect/libs/data';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-component/user.service';

@Component({
  selector: 'stardew-connect-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = {
    username: '',
    name: '',
    emailAddress: '',
    password: '',
    birthday: new Date(),
    favoriteThing: '',
    memberSince: new Date(),
  };

  error: string | undefined;

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    this.userService.registerUser(this.user).subscribe({
      next: (result: any) => {
        console.log('User registered:', this.user);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log('Error:', error);
        this.error = error.error.message;
      },
    });
  }
}
