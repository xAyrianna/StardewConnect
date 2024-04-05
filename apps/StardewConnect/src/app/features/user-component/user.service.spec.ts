import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '@StardewConnect/libs/data';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Test User 1',
      username: 'testuser1',
      emailAddress: 'test@mail.com',
      birthday: new Date(),
      password: 'test',
      favoriteThing: 'test',
      memberSince: new Date(),
    },
    {
      id: 2,
      name: 'Test User 2',
      username: 'testuser2',
      emailAddress: 'test@mail.com',
      birthday: new Date(),
      password: 'test',
      favoriteThing: 'test',
      memberSince: new Date(),
    },
    {
      id: 3,
      name: 'Test User 3',
      username: 'testuser3',
      emailAddress: 'test@mail.com',
      birthday: new Date(),
      password: 'test',
      favoriteThing: 'test',
      memberSince: new Date(),
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    service.getAllUsers().subscribe((users) => {
      expect(users.length).toBe(3);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/user`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: mockUsers });
  });

  it('should get user by username', () => {
    service.getUserByUsername('testuser1').subscribe((user) => {
      expect(user).toEqual(mockUsers[0]);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/user/testuser1`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: mockUsers[0] });
  });

  it('should add user', () => {
    const newUser: User = {
      id: 4,
      name: 'Test User 4',
      username: 'testuser4',
      emailAddress: 'test@email.com',
      birthday: new Date(),
      password: 'test',
      favoriteThing: 'test',
      memberSince: new Date(),
    };
    service.registerUser(newUser).subscribe((user) => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/user`);
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should update user', () => {
    const updatedUser: User = {
      id: 1,
      name: 'Test User 1',
      username: 'testuser1',
      emailAddress: 'newemail@mail.com',
      birthday: new Date(),
      password: 'test',
      favoriteThing: 'test',
      memberSince: new Date(),
    };
    service.updateUser(updatedUser).subscribe((user) => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/user`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });

  it('should delete user', () => {
    const deletedUser: User = {
      id: 1,
      name: 'Test User 1',
      username: 'testuser1',
      birthday: new Date(),
      emailAddress: 'test@mail.com',
      password: 'test',
      favoriteThing: 'test',
      memberSince: new Date(),
    };
    service.deleteUser(deletedUser).subscribe((user) => {
      expect(user).toEqual(deletedUser);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/user`);
    expect(req.request.method).toBe('DELETE');
    req.flush(deletedUser);
  });
});
