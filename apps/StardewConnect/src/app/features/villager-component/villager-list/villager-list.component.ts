import { Villager } from '@StardewConnect/libs/data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { VillagerService } from '../villager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stardew-connect-villager-list',
  templateUrl: './villager-list.component.html',
  styleUrls: ['./villager-list.component.css'],
})
export class VillagerListComponent implements OnInit, OnDestroy {
  villagers: Villager[] | undefined;
  subscription: Subscription | undefined;

  constructor(private villagerService: VillagerService) {}

  ngOnInit(): void {
    this.subscription = this.villagerService.getAllVillagers().subscribe((response) => {
      this.villagers = response;
      console.log(this.villagers);
    });
  }

  ngOnDestroy(): void {
    console.log('destroying villager-list component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  deleteVillager(villager: Villager) {
    console.log('deleting villager');
    this.villagerService
      .deleteVillager(villager)
      .subscribe(
        () => (this.villagers = this.villagers?.filter((v) => v.id !== villager.id))
      );
  }
}
