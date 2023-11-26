import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { User } from '@StardewConnect/libs/data';
import { UserService } from '../user.service';
import { Subscription, of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Test User 1',
      username: 'testuser1',
      emailAddress: 'test@mail.com',
      password: 'test',
      favoriteThing: 'test',
      memberSince: new Date(),
    },
    {
      id: 2,
      name: 'Test User 2',
      username: 'testuser2',
      emailAddress: 'test@mail.com',
      password: 'test',
      favoriteThing: 'test',
      memberSince: new Date(),
    },
    {
      id: 3,
      name: 'Test User 3',
      username: 'testuser3',
      emailAddress: 'test@mail.com',
      password: 'test',
      favoriteThing: 'test',
      memberSince: new Date(),
    },
  ];
  const userServiceMock = {
    getAllUsers: () => of(mockUsers),
    getUserByUsername: (username: string) =>
      of(mockUsers.find((u) => u.username === username)),
    addUser: (newUser: User) => of(newUser),
    updateUser: (updatedUser: User) => of(updatedUser),
    deleteUser: (deletedUser: User) => of(deletedUser),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call UserService.getAllUsers on init', () => {
    const getAllUsersSpy = jest.spyOn(userService, 'getAllUsers');
    component.ngOnInit();
    expect(getAllUsersSpy).toHaveBeenCalled();
  });

  it('should call UserService.deleteUser when deleteUser is called', () => {
    const deleteUserSpy = jest.spyOn(userService, 'deleteUser');
    component.deleteUser(mockUsers[0]);
    expect(deleteUserSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from subscription when component is destroyed', () => {
    component.subscription = new Subscription();
    const unsubscribeSpy = jest.spyOn(component.subscription!, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
