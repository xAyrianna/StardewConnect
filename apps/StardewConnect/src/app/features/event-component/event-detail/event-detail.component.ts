import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { Event } from '@StardewConnect/libs/data';

@Component({
  selector: 'stardew-connect-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit, OnDestroy {
  componentId: string | null | undefined;
  event: Event | undefined;
  subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        this.subscription = this.eventService
          .getEventByName(this.componentId)
          .subscribe((response) => {
            this.event = response;
            console.log(this.event);
          });
      } else {
        console.log('Nieuwe component');
      }
    });
  }

  ngOnDestroy(): void {
    console.log('destroying event-detail component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
