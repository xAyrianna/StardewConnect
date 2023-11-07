import { Villager } from '@StardewConnect/libs/data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VillagerService } from '../villager.service';

@Component({
  selector: 'stardew-connect-villager-detail',
  templateUrl: './villager-detail.component.html',
  styleUrls: ['./villager-detail.component.css'],
})
export class VillagerDetailComponent implements OnInit, OnDestroy {
  componentId: string | null | undefined;
  villager: Villager | undefined;
  subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private villagerService: VillagerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        this.subscription = this.villagerService
          .getVillagerByName(this.componentId)
          .subscribe((response) => {
            this.villager = response;
            console.log(this.villager);
          });
      } else {
        console.log('Nieuwe component');
      }
    });
  }

  ngOnDestroy(): void {
    console.log('destroying villager-detail component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}

