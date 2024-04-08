import { Event } from './event.interface';
import { Villager } from './villager.interface';
export interface Town {
  _id?: string;
  name: string;
  capacity: number;
  facilities: string[];
  creationDate: Date;
  createdBy: string;
  events: Event[];
  villagersInTown: Villager[];
}
