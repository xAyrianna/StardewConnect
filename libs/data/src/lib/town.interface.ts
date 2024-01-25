import { Event } from './event.interface';
export interface Town {
  id: number;
  name: string;
  capacity: number;
  facilities: string[];
  creationDate: Date;
  createdBy: string;
  events: Event[];
  villagersInTown: string[];
}
