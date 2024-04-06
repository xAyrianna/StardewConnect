import { Gender, LifeStage, Villager } from '@StardewConnect/libs/data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VillagerService } from '../villager.service';

@Component({
  selector: 'stardew-connect-villager-edit',
  templateUrl: './villager-edit.component.html',
  styleUrls: ['./villager-edit.component.css'],
})
export class VillagerEditComponent implements OnInit, OnDestroy {
  componentId: string | null | undefined;
  componentExists: boolean | undefined;
  villager: Villager | undefined;
  eLifeStage = LifeStage;
  eGender = Gender;
  subscription: Subscription | undefined;
  villagerName: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private villagerService: VillagerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        console.log('Bestaande component');
        this.componentExists = true;
        // Haal de bestaande object uit het array
        //functie toevoegen!
        this.subscription = this.villagerService
          .getVillagerByName(this.componentId)
          .subscribe((response) => {
            this.villager = { ...response }; //spread
            this.villagerName = response.name;
            console.log(this.villager);
          });
      } else {
        console.log('Nieuwe component');
        this.componentExists = false;
        // geen bestaande object, dus nieuw object maken
        this.villager = {
          _id: undefined,
          name: '',
          gender: Gender.Unknown,
          lifeStage: LifeStage.Unknown,
          marriageable: false,
          birthday: '',
          favoriteGifts: [''],
          createdBy: localStorage.getItem('user_ID') ?? '',
        };
      }
    });
  }

  ngOnDestroy(): void {
    console.log('destroying villager-edit component');
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    console.log('Submitting the form');
    // User toevoegen aan UserArray
    if (this.componentExists) {
      // update bestaande entry
      console.log('editting villager');
      this.villagerService.updateVillager(this.villager!).subscribe();
    } else {
      // nieuwe object toevoegen aan array
      console.log('adding villager');
      this.villagerService.addVillager(this.villager!).subscribe();
    }
    this.router.navigate(['villager']);
  }

  deleteFavoriteGift(i: number) {
    this.villager?.favoriteGifts?.splice(i, 1);
  }
  addToFacoriteGifts() {
    this.villager?.favoriteGifts?.push('');
  }

  trackByFn(index: number, favoriteGift: any) {
    return favoriteGift.name;
  }
}
