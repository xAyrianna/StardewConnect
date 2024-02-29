import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './features/home-component/home.component';
import { AboutComponent } from './features/about-component/about.component';
import { EventListComponent } from './features/event-component/event-list/event-list.component';
import { EventDetailComponent } from './features/event-component/event-detail/event-detail.component';
import { EventEditComponent } from './features/event-component/event-edit/event-edit.component';
import { TownEditComponent } from './features/town-component/town-edit/town-edit.component';
import { TownListComponent } from './features/town-component/town-list/town-list.component';
import { TownDetailComponent } from './features/town-component/town-detail/town-detail.component';
import { VillagerDetailComponent } from './features/villager-component/villager-detail/villager-detail.component';
import { VillagerEditComponent } from './features/villager-component/villager-edit/villager-edit.component';
import { VillagerListComponent } from './features/villager-component/villager-list/villager-list.component';
import { UserListComponent } from './features/user-component/user-list/user-list.component';
import { UserEditComponent } from './features/user-component/user-edit/user-edit.component';
import { UserDetailComponent } from './features/user-component/user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponentComponent } from './features/login-component.component';
import { LoginComponentComponent } from './features/login-component/login-component.component';
import { LoginComponent } from './features/login-component/login.component';
import { RegisterComponent } from './features/register-component/register.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    HomeComponent,
    AboutComponent,
    EventListComponent,
    EventDetailComponent,
    EventEditComponent,
    TownEditComponent,
    TownListComponent,
    TownDetailComponent,
    VillagerDetailComponent,
    VillagerEditComponent,
    VillagerListComponent,
    UserListComponent,
    UserEditComponent,
    UserDetailComponent,
    LoginComponentComponent,
    LoginComponentComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
