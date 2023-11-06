import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TownEditComponent } from './town-edit.component';

describe('TownEditComponent', () => {
  let component: TownEditComponent;
  let fixture: ComponentFixture<TownEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TownEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TownEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
