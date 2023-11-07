import { Town } from '@StardewConnect/libs/data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TownService } from '../town.service';

@Component({
  selector: 'stardew-connect-town-detail',
  templateUrl: './town-detail.component.html',
  styleUrls: ['./town-detail.component.css'],
})
export class TownDetailComponent implements OnInit, OnDestroy {
  componentId: string | null | undefined;
  town: Town | undefined;
  subscription: Subscription | undefined;
  creationDate: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private townService: TownService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        this.subscription = this.townService
          .getTownByName(this.componentId)
          .subscribe((response) => {
            this.town = response;
            this.creationDate = response.creationDate.toLocaleDateString();
            console.log(this.town);
          });
      } else {
        console.log('Nieuwe component');
      }
    });
  }

  ngOnDestroy(): void {
    console.log('destroying town-detail component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
