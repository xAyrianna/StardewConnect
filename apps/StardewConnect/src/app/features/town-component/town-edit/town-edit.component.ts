import { Town } from '@StardewConnect/libs/data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TownService } from '../town.service';

@Component({
  selector: 'stardew-connect-town-edit',
  templateUrl: './town-edit.component.html',
  styleUrls: ['./town-edit.component.css'],
})
export class TownEditComponent implements OnInit, OnDestroy {
  componentId: string | null | undefined;
  componentExists: boolean | undefined;
  town: Town | undefined;
  subscription: Subscription | undefined;
  townName: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private townService: TownService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        console.log('Bestaande component');
        this.componentExists = true;
        // Haal de bestaande object uit het array
        //functie toevoegen!
        this.subscription = this.townService
          .getTownByName(this.componentId)
          .subscribe((response) => {
            this.town = { ...response }; //spread
            this.townName = response.name;
            console.log(this.town);
          });
      } else {
        console.log('Nieuwe component');
        this.componentExists = false;
        // geen bestaande object, dus nieuw object maken
        this.town = {
          id: -1,
          name: '',
          capacity: 0,
          facilities: [''],
          creationDate: new Date(),
          events: [],
          villagersInTown: [],
          createdBy: '', //Add user id
        };
      }
    });
  }

  ngOnDestroy(): void {
    console.log('destroying town-edit component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    console.log('Submitting the form');
    // User toevoegen aan UserArray
    if (this.componentExists) {
      // update bestaande entry
      console.log('editting town');
      this.townService.updateTown(this.town!).subscribe();
    } else {
      // nieuw object toevoegen aan array
      console.log('adding town');
      this.townService.addTown(this.town!).subscribe();
    }
    this.router.navigate(['town']);
  }

  deleteFacility(i: number) {
    this.town?.facilities?.splice(i, 1);
  }
  addToFacilities() {
    this.town?.facilities?.push('');
  }

  trackByFn(index: number, facility: any) {
    return facility.name;
  }
}

