import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { ApiResponse, User, UserCredentials } from '@StardewConnect/libs/data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BASE_URL = environment.apiUrl;
  userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(credentials: UserCredentials): Observable<any> {
    const authUrl = this.BASE_URL + '/auth/login';

    return this.http.post(authUrl, credentials).pipe(
      tap((result: any) => {
        if (result.access_token && result.user) {
          localStorage.setItem('access_token', result.access_token);
          localStorage.setItem('user_ID', result.user._id);
          this.userLoggedIn.next(true);
          return result;
        }
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  registerUser(newUser: User) {
    console.log('Adding new user');
    const userUrl = this.BASE_URL + '/user';
    return this.http.post<any>(userUrl, newUser).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    const userUrl = this.BASE_URL + '/user';

    return this.http.get<ApiResponse<User[]>>(userUrl).pipe(
      map((response: ApiResponse<User[]>) => response.results),
      tap((users: User[]) => {
        return users;
      })
    );
  }

  getProfile(): Observable<User> {
    const BASE_URL = this.BASE_URL + '/auth/profile';
    return this.http
      .get<ApiResponse<User>>(BASE_URL)
      .pipe(map((response: ApiResponse<User>) => response.results));
  }

  getUserByUsername(username: string): Observable<User> {
    const userUrl = this.BASE_URL + '/user/' + username;
    return this.http
      .get<ApiResponse<User>>(userUrl)
      .pipe(map((response: ApiResponse<User>) => response.results));
  }

  getUserByID(id: string) {
    const userUrl = this.BASE_URL + '/user/id/' + id;
    return this.http
      .get<ApiResponse<User>>(userUrl)
      .pipe(map((response: ApiResponse<User>) => response.results));
  }

  updateUser(updatedUser: User) {
    const userUrl = this.BASE_URL + '/user';
    return this.http.put<User>(userUrl, updatedUser);
  }

  deleteUser(deletedUser: User) {
    // delete user
    const userUrl = this.BASE_URL + '/user';
    const options = {
      body: deletedUser,
    };
    return this.http.delete<User>(userUrl, options);
  }

  followUser(username: string) {
    const userUrl = this.BASE_URL + '/user/follow/' + username;
    return this.http.post(userUrl, {});
  }

  unfollowUser(username: string) {
    const userUrl = this.BASE_URL + '/user/unfollow/' + username;
    return this.http.delete(userUrl);
  }

  getFollowers() {
    const userUrl = this.BASE_URL + '/user/followers';
    return this.http
      .get<ApiResponse<User[]>>(userUrl)
      .pipe(map((response: ApiResponse<User[]>) => response.results));
  }

  checkIfFollowing(username: string) {
    const userUrl = this.BASE_URL + '/user/check/' + username;
    return this.http.get<boolean>(userUrl);
  }

  getFollowing() {
    const userUrl = this.BASE_URL + '/user/following';
    return this.http
      .get<ApiResponse<User[]>>(userUrl)
      .pipe(map((response: ApiResponse<User[]>) => response.results));
  }

  getRecommendedOfFollowing() {
    const userUrl = this.BASE_URL + '/user/recommendations/following';
    return this.http
      .get<ApiResponse<User[]>>(userUrl)
      .pipe(map((response: ApiResponse<User[]>) => response.results));
  }

  getRecommendedOfFriendship() {
    const userUrl = this.BASE_URL + '/user/recommendations/friends';
    return this.http
      .get<ApiResponse<User[]>>(userUrl)
      .pipe(map((response: ApiResponse<User[]>) => response.results));
  }
}
