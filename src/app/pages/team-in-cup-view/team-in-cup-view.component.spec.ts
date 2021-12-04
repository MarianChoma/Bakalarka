import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInCupViewComponent } from './team-in-cup-view.component';

describe('TeamInCupViewComponent', () => {
  let component: TeamInCupViewComponent;
  let fixture: ComponentFixture<TeamInCupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamInCupViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInCupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
