import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { Event } from '@StardewConnect/libs/data';

@Component({
  selector: 'stardew-connect-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit, OnDestroy {
  events: Event[] | undefined;
  subscription: Subscription | undefined;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.subscription = this.eventService.getAllEvents().subscribe((response) => {
      this.events = response;
      console.log(this.events);
    });
  }

  ngOnDestroy(): void {
    console.log('destroying event-list component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  deleteEvent(event: Event) {
    console.log('deleting event');
    this.eventService
      .deleteEvent(event)
      .subscribe(
        () => (this.events = this.events?.filter((e) => e._id !== event._id))
      );
  }
}

