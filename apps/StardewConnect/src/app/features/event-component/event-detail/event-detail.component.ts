import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { Event, Town } from '@StardewConnect/libs/data';
import { TownService } from '../../town-component/town.service';

@Component({
  selector: 'stardew-connect-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit, OnDestroy {
  componentId: string | null | undefined;
  event: Event | undefined;
  subscription: Subscription | undefined;
  isCreator: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private townService: TownService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        this.subscription = this.eventService
          .getEventByName(this.componentId)
          .subscribe((response) => {
            this.event = response;
            this.subscription = this.townService
              .getTownById(this.event.inTownId)
              .subscribe((response) => {
                if (response.createdBy === localStorage.getItem('user_ID')) {

                  this.isCreator = true;
                }
              });
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

  deleteEvent() {
    console.log('deleting event');
    if(this.event === undefined) {
      return;
    }
    this.subscription = this.eventService.deleteEvent(this.event).subscribe(() => {
      console.log('Event deleted');
      this.router.navigate(['/event']);
    })
    
  }
}
