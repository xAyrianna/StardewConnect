import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { Event, Town } from '@StardewConnect/libs/data';
import { TownService } from '../../town-component/town.service';

@Component({
  selector: 'stardew-connect-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
})
export class EventEditComponent implements OnInit, OnDestroy {
  componentId: string | null | undefined;
  componentExists: boolean | undefined;
  event: Event | undefined;
  subscription: Subscription | undefined;
  eventName: string | undefined;
  selectedTownName: string | undefined;
  availableTowns: Town[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private townService: TownService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.componentId = params.get('id');
      await this.townService.getAllTowns().subscribe((response) => {
        console.log('Available towns:', response);
        this.availableTowns = response;
      });
      if (this.componentId) {
        console.log('Bestaande component');
        this.componentExists = true;
        // Haal de bestaande object uit het array
        //functie toevoegen!
        this.subscription = this.eventService
          .getEventByName(this.componentId)
          .subscribe((response) => {
            this.event = { ...response }; //spread
            this.eventName = response.name;
            console.log(this.event);
          });
      } else {
        console.log('Nieuwe component');
        this.componentExists = false;
        console.log(`${this.availableTowns}`);
        // geen bestaande object, dus nieuw object maken
        this.event = {
          _id: undefined,
          name: '',
          description: '',
          date: '',
          location: '',
          hasHappened: false,
          inTownId: '',
        };
      }
    });
  }

  ngOnDestroy(): void {
    console.log('destroying event-edit component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    console.log('Submitting the form');
    // User toevoegen aan UserArray

    // trying to update the event list for chosen town


    if (this.componentExists) {
      // update bestaande entry
      console.log('editting event');
      this.eventService.updateEvent(this.event!).subscribe();
    } else {
      // nieuwe object toevoegen aan array
      this.eventService.addEvent(this.event!).subscribe();
    }
    this.router.navigate(['event']);
  }
}
