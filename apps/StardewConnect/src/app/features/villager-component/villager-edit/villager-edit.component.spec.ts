import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VillagerEditComponent } from './villager-edit.component';

describe('VillagerEditComponent', () => {
  let component: VillagerEditComponent;
  let fixture: ComponentFixture<VillagerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VillagerEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VillagerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
