import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VillagerDetailComponent } from './villager-detail.component';

describe('VillagerDetailComponent', () => {
  let component: VillagerDetailComponent;
  let fixture: ComponentFixture<VillagerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillagerDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VillagerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
