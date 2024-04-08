import { Town } from '@StardewConnect/libs/data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TownService } from '../town.service';

@Component({
  selector: 'stardew-connect-town-list',
  templateUrl: './town-list.component.html',
  styleUrls: ['./town-list.component.css'],
})
export class TownListComponent implements OnInit, OnDestroy {
  towns: Town[] | undefined;
  subscription: Subscription | undefined;

  constructor(private townService: TownService) {}

  ngOnInit(): void {
    this.subscription = this.townService.getAllTowns().subscribe((response) => {
      this.towns = response;
    });
  }

  ngOnDestroy(): void {
    console.log('destroying town-list component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
