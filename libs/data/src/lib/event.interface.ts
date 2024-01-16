import { Town } from "./town.interface";

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  hasHappened: boolean;
  // inTownId: number; 
}
