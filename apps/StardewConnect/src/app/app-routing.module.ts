import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home-component/home.component';
import { AboutComponent } from './features/about-component/about.component';
import { TownListComponent } from './features/town-component/town-list/town-list.component';
import { TownEditComponent } from './features/town-component/town-edit/town-edit.component';
import { TownDetailComponent } from './features/town-component/town-detail/town-detail.component';
import { EventListComponent } from './features/event-component/event-list/event-list.component';
import { EventEditComponent } from './features/event-component/event-edit/event-edit.component';
import { EventDetailComponent } from './features/event-component/event-detail/event-detail.component';
import { VillagerListComponent } from './features/villager-component/villager-list/villager-list.component';
import { VillagerEditComponent } from './features/villager-component/villager-edit/villager-edit.component';
import { VillagerDetailComponent } from './features/villager-component/villager-detail/villager-detail.component';
import { UserListComponent } from './features/user-component/user-list/user-list.component';
import { UserEditComponent } from './features/user-component/user-edit/user-edit.component';
import { UserDetailComponent } from './features/user-component/user-detail/user-detail.component';
import { LoginComponent } from './features/login-component/login.component';
import { RegisterComponent } from './features/register-component/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},

  { path: 'user', component: UserListComponent, pathMatch: 'full' },
  { path: 'user/new', component: UserEditComponent, pathMatch: 'full' },
  { path: 'user/:id', component: UserDetailComponent, pathMatch: 'full' },
  { path: 'user/:id/edit', component: UserEditComponent, pathMatch: 'full' },

  { path: 'town', component: TownListComponent, pathMatch: 'full' },
  { path: 'town/new', component: TownEditComponent, pathMatch: 'full' },
  { path: 'town/:id', component: TownDetailComponent, pathMatch: 'full' },
  { path: 'town/:id/edit', component: TownEditComponent, pathMatch: 'full' },

  { path: 'event', component: EventListComponent, pathMatch: 'full' },
  { path: 'event/new', component: EventEditComponent, pathMatch: 'full' },
  { path: 'event/:id', component: EventDetailComponent, pathMatch: 'full' },
  { path: 'event/:id/edit', component: EventEditComponent, pathMatch: 'full' },

  { path: 'villager', component: VillagerListComponent, pathMatch: 'full' },
  { path: 'villager/new', component: VillagerEditComponent, pathMatch: 'full' },
  {
    path: 'villager/:id',
    component: VillagerDetailComponent,
    pathMatch: 'full',
  },
  {
    path: 'villager/:id/edit',
    component: VillagerEditComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
