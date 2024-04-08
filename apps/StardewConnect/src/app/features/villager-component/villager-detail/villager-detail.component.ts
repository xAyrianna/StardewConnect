import { Villager } from '@StardewConnect/libs/data';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VillagerService } from '../villager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddVillagerDialogComponent } from '../add-villager-dialog/add-villager-dialog.component';

@Component({
  selector: 'stardew-connect-villager-detail',
  templateUrl: './villager-detail.component.html',
  styleUrls: ['./villager-detail.component.css'],
})
export class VillagerDetailComponent implements OnInit, OnDestroy {
  componentId: string | null | undefined;
  villager: Villager | undefined;
  subscription: Subscription | undefined;
  isCreator: boolean = false;
  amountOfHearts: number = 0;
  areFriends: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private villagerService: VillagerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        this.subscription = this.villagerService
          .getVillagerByName(this.componentId)
          .subscribe((response) => {
            this.villager = response;

            if (this.villager.createdBy == localStorage.getItem('user_ID')) {
              this.isCreator = true;
            }
            this.subscription = this.villagerService
              .checkIfFriends(this.villager)
              .subscribe((response) => {
                this.areFriends = response;
              });
            this.subscription = this.villagerService
              .getHearts(this.villager)
              .subscribe((response) => {
                this.amountOfHearts = response;
              });
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

  deleteVillager() {
    console.log('deleting villager');
    if (this.villager === undefined) {
      return;
    }
    this.villagerService.deleteVillager(this.villager).subscribe(() => {
      console.log('Villager deleted');
      this.router.navigate(['/villager']);
    });
  }

  openDialog() {
    const modalRef = this.modalService.open(AddVillagerDialogComponent, {
      centered: true,
    });
    modalRef.componentInstance.villager = this.villager;
  }

  befriend() {
    if (this.villager) {
      this.subscription = this.villagerService
        .befriendVillager(this.villager)
        .subscribe(() => {
          this.router.navigate(['/villager']);
        });
    }
  }

  unfriend() {
    if (this.villager) {
      this.subscription = this.villagerService
        .unfriendVillager(this.villager)
        .subscribe(() => {
          this.router.navigate(['/villager']);
        });
    }
  }

  giveGift() {
    if (this.villager) {
      this.subscription = this.villagerService
        .updateVillagerHearts(this.villager)
        .subscribe(() => {
          this.router.navigate(['/villager']);
        });
    }
  }
}
