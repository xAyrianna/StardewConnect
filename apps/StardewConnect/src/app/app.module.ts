import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './features/home-component/home.component';
import { AboutComponent } from './features/about-component/about.component';
import { EventListComponent } from './features/event-component/event-list/event-list.component';
import { EventDetailComponent } from './features/event-component/event-detail/event-detail.component';
import { EventEditComponent } from './features/event-component/event-edit/event-edit.component';

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
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
