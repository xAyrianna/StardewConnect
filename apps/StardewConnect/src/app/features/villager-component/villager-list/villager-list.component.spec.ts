import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VillagerListComponent } from './villager-list.component';

describe('VillagerListComponent', () => {
  let component: VillagerListComponent;
  let fixture: ComponentFixture<VillagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillagerListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VillagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
