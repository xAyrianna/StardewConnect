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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },

  { path: 'town', component: TownListComponent, pathMatch: 'full' },
  { path: 'town/new', component: TownEditComponent, pathMatch: 'full' },
  { path: 'town/:id', component: TownDetailComponent, pathMatch: 'full' },
  { path: 'town/:id/edit', component: TownEditComponent, pathMatch: 'full' },

  { path: 'event', component: EventListComponent, pathMatch: 'full' },
  { path: 'event/new', component: EventEditComponent, pathMatch: 'full' },
  { path: 'event/:id', component: EventDetailComponent, pathMatch: 'full' },
  { path: 'event/:id/edit', component: EventEditComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
