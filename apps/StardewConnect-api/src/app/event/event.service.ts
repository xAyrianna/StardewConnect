import { Injectable } from '@nestjs/common';
import { Event } from '@StardewConnect/libs/data';

@Injectable()
export class EventService {
    events: Event[] = [
      {
        id: 1,
        name: 'Luau',
        description:
          'A pot luck event where villagers bring something to contribute to the pan!',
        date: 'Summer 11',
        location: 'Beach',
        hasHappened: false,
        inTownId: 2,
      },
      {
        id: 2,
        name: "Spirit's Eve",
        description:
          "An evening full of spooky events. There's a labyrinth, finish it and maybe there's a price...",
        date: 'Fall 27',
        location: "Town's square",
        hasHappened: true,
        inTownId: 1,
      },
      {
        id: 3,
        name: 'Feast of the Winter Star',
        description:
          'A feast where everybody from town enjoys dinner together and participate to the secret gift-giving',
        date: 'Winter 25',
        location: "Town's square",
        hasHappened: false,
        inTownId: 1,
      },
      {
        id: 4,
        name: 'Flower dance',
        description:
          "Every year there's a flower dance. It's tradition. It's possible to dance with the bachelors and bachelorettes.",
        date: 'Spring 24',
        location: 'Forest',
        hasHappened: false,
        inTownId: 3,
      },
    ];
    private getIndexById(event: Event): number {
      return this.events.findIndex((e) => e.id === event.id);
    }
  
    getAll() {
      return { results: this.events };
    }
  
    getEventByName(name: string) {
      return { results: this.events.filter((event) => event.name === name)[0] };
    }
  
    addEvent(newEvent: Event) {
      newEvent.id = this.events.at(this.events.length - 1)!.id + 1;
      console.log(newEvent.id);
      this.events.push(newEvent);
    }
  
    updateEvent(updatedEvent: Event) {
      const index = this.getIndexById(updatedEvent);
      this.events[index] = updatedEvent;
    }
  
    deleteEvent(deletedTown: Event) {
      // delete event
      const index = this.getIndexById(deletedTown);
      this.events.splice(index, 1);
      console.log(this.events);
    }
  }