import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, map, tap } from 'rxjs';
import { ApiResponse, User } from '@StardewConnect/libs/data';

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

  addUser(newUser: User): Observable<User> {
    // newUser.id = this.users.length + 1;
    // newUser.id = this.users.at(this.users.length - 1)?.id + 1;
    const userUrl = this.BASE_URL + '/user';
    return this.http.post<User>(userUrl, newUser);
  }
  updateUser(updatedUser: User): Observable<User> {
    const userUrl = this.BASE_URL + '/user';
    return this.http.put<User>(userUrl, updatedUser);
  }

  deleteUser(deletedUser: User): Observable<User> {
    // delete user
    const userUrl = this.BASE_URL + '/user';
    const options = {
      body: deletedUser,
    };
    console.log(options);
    return this.http.delete<User>(userUrl, options);
  }
}
