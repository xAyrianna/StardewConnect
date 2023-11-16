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
  users: User[] = [
    {
      id: 1,
      username: 'AbiLovesFood',
      name: 'Abigail',
      emailAddress: 'pierresdaughter@mail.com',
      password: 'Amethyst123',
      favoriteThing: 'Amethyst',
      memberSince: new Date('November 13, 2022'),
    },
    {
      id: 2,
      username: 'BashPrograms',
      name: 'Sebastian',
      emailAddress: 'EmoBoy@mail.com',
      password: 'INeverLeaveMyRoomLOL420',
      favoriteThing: 'Frozen Tear',
      memberSince: new Date('December 17, 2021'),
    },
    {
      id: 3,
      username: 'CottageCoreL',
      name: 'Leah',
      emailAddress: 'L.Artist@mail.com',
      password: 'ForageBaby234',
      favoriteThing: 'Poppyseed Muffin',
      memberSince: new Date('December 23, 2021'),
    },
    {
      id: 4,
      username: 'ThatOneDrunkGuy',
      name: 'Shane',
      emailAddress: 'HotPepperBoy@mail.com',
      password: 'JojaSucks245',
      favoriteThing: 'Beer',
      memberSince: new Date('May 20, 2022'),
    },
  ];

  constructor(private http: HttpClient) {}

  getAllUsers(): User[] {
    return this.users;
    // const userUrl = this.BASE_URL + '/user';

    // console.log('get ' + userUrl);
    // return this.http.get<ApiResponse<User[]>>(userUrl).pipe(
    //   map((response: ApiResponse<User[]>) => response.results),
    //   tap((users: User[]) => {
    //     console.log(users);
    //     return users;
    //   })
    // );
  }

  getUserByUsername(username: string): User {
    return this.users.filter((user) => user.username === username)[0];
    // const userUrl = this.BASE_URL + '/user/' + username;
    // return this.http
    //   .get<ApiResponse<User>>(userUrl)
    //   .pipe(map((response: ApiResponse<User>) => response.results));
  }

  addUser(newUser: User): User {
    newUser.id = this.users.length + 1;
    // newUser.id = this.users.at(this.users.length - 1)?.id + 1;
    this.users.push(newUser);
    return newUser;
    // const userUrl = this.BASE_URL + '/user';
    // return this.http.post<User>(userUrl, newUser);
  }
  updateUser(updatedUser: User): User {
    const index = this.users.findIndex((u) => u.id === updatedUser.id);
    this.users[index] = updatedUser;
    return updatedUser;
    // const userUrl = this.BASE_URL + '/user';
    // return this.http.put<User>(userUrl, updatedUser);
  }

  deleteUser(deletedUser: User): User {
    // delete user
    const index = this.users.findIndex((u) => u.id === deletedUser.id);
    this.users.splice(index, 1);
    return deletedUser;
    // const userUrl = this.BASE_URL + '/user';
    // const options = {
    //   body: deletedUser,
    // };
    // console.log(options);
    // return this.http.delete<User>(userUrl, options);
  }
}
