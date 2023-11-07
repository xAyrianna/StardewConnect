export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  Unknown = 'Unknown',
}

export enum LifeStage {
  Child = 'Child',
  Adult = 'Adult',
  Elder = 'Elder',
  Unknown = 'Unknown',
}

export interface Villager {
  id: number;
  name: string;
  gender: Gender;
  lifeStage: LifeStage;
  marriageable: boolean;
  birthday: string;
  favoriteGifts: string[];
}