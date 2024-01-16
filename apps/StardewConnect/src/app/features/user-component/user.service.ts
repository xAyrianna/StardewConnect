import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, map, tap } from 'rxjs';
import { ApiResponse, User } from '@StardewConnect/libs/data';
// import * as bcrypt from 'bcrypt'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const userUrl = this.BASE_URL + '/user';

    console.log('get ' + userUrl);
    return this.http.get<ApiResponse<User[]>>(userUrl).pipe(
      map((response: ApiResponse<User[]>) => response.results),
      tap((users: User[]) => {
        console.log(users);
        return users;
      })
    );
  }

  getUserByUsername(username: string): Observable<User> {
    const userUrl = this.BASE_URL + '/user/' + username;
    return this.http
      .get<ApiResponse<User>>(userUrl)
      .pipe(map((response: ApiResponse<User>) => response.results));
  }

  async addUser(newUser: User) {
    console.log("Adding new user")
    const userUrl = this.BASE_URL + '/user';
    console.log('post ' + userUrl);
    // newUser.password = await bcrypt.hash(newUser.password, 10);
    return this.http.post<User>(userUrl, newUser);
  }
  async updateUser(updatedUser: User){
    const userUrl = this.BASE_URL + '/user';
    // updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
    return this.http.put<User>(userUrl, updatedUser);
  }

  deleteUser(deletedUser: User){
    // delete user
    const userUrl = this.BASE_URL + '/user';
    const options = {
      body: deletedUser,
    };
    console.log(options);
    return this.http.delete<User>(userUrl, options);
  }
}
