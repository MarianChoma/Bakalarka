import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballmatchPageComponent } from './footballmatch-page.component';

describe('FootballmatchPageComponent', () => {
  let component: FootballmatchPageComponent;
  let fixture: ComponentFixture<FootballmatchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballmatchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballmatchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
