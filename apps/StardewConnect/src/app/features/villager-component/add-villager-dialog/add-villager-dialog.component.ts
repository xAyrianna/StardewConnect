import { Town, Villager } from '@StardewConnect/libs/data';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserService } from '../../user-component/user.service';
import { TownService } from '../../town-component/town.service';
import { Router } from '@angular/router';

@Component({
  selector: 'stardew-connect-add-villager-dialog',
  templateUrl: './add-villager-dialog.component.html',
  styleUrls: ['./add-villager-dialog.component.css'],
})
export class AddVillagerDialogComponent implements OnInit {
  villager: Villager | undefined;
  selectedTown: Town | undefined;
  towns: Town[] = [];
  subscription: Subscription | undefined;
  error: string | undefined;

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private townService: TownService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.userService
      .getUserByID(localStorage.getItem('user_ID') ?? '')
      .subscribe((response) => {
        this.towns = response.towns ?? [];
      });
  }

  async onSubmit() {
    if (!this.selectedTown) {
      this.error = 'Please select a town';
      return;
    }
    if (
      this.selectedTown.villagersInTown?.length >= this.selectedTown.capacity
    ) {
      this.error = 'This town is full';
      return;
    }
    if (this.selectedTown.villagersInTown.length > 0) {
      for (let villager of this.selectedTown.villagersInTown) {
        if (villager._id == this.villager?._id) {
          this.error = 'This villager is already in this town';
          return;
        }
      }
    }
    if (this.villager?._id) {
      console.log('Adding villager to town');
      this.selectedTown.villagersInTown.push(this.villager);
      await this.townService.updateTown(this.selectedTown).subscribe();
      this.activeModal.close();
      this.router.navigate(['/town/' + this.selectedTown.name]);
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
