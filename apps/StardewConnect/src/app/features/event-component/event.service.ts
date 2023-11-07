/* eslint-disable @nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ApiResponse, Event } from '@StardewConnect/libs/data';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  BASE_URL = environment.apiUrl
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    const eventUrl = this.BASE_URL + '/event';

    console.log('get ' + eventUrl);
    return this.http.get<ApiResponse<Event[]>>(eventUrl).pipe(
      map((response: ApiResponse<Event[]>) => response.results),
      tap((events: Event[]) => {
        console.log(events);
        return events;
      })
    );
  }

  getEventByName(name: string): Observable<Event> {
    const eventUrl = this.BASE_URL + '/event/' + name;
    return this.http
      .get<ApiResponse<Event>>(eventUrl)
      .pipe(map((response: ApiResponse<Event>) => response.results));
  }

  addEvent(newEvent: Event) {
    const eventUrl = this.BASE_URL + '/event';
    return this.http.post<Event>(eventUrl, newEvent);
  }

  updateEvent(updatedEvent: Event) {
    const eventUrl = this.BASE_URL + '/event';
    return this.http.put<Event>(eventUrl, updatedEvent);
  }

  deleteEvent(deletedEvent: Event) {
    // delete event
    const eventUrl = this.BASE_URL + '/event';
    const options = {
      body: deletedEvent,
    };
    console.log(options);
    return this.http.delete<Event>(eventUrl, options);
  }
}