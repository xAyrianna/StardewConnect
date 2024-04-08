import { Town, Villager } from '@StardewConnect/libs/data';
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
  isCreator: boolean = false;
  userID: string | null = localStorage.getItem('user_ID');

  constructor(
    private route: ActivatedRoute,
    private townService: TownService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        this.subscription = this.townService
          .getTownByName(this.componentId)
          .subscribe((response) => {
            if (response.createdBy == localStorage.getItem('user_ID')) {
              this.isCreator = true;
            }
            this.town = response;
            const date = new Date(response.creationDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            this.creationDate = `${day}/${month}/${year}`;
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

  deleteTown() {
    console.log('deleting town');
    if (this.town) {
      this.townService.deleteTown(this.town).subscribe(() => {
        console.log('Town deleted');
        this.router.navigate(['/town']);
      });
    }
  }
}
