import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TownDetailComponent } from './town-detail.component';

describe('TownDetailComponent', () => {
  let component: TownDetailComponent;
  let fixture: ComponentFixture<TownDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TownDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TownDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
