import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorLandingComponent } from './instructor-landing.component';

describe('InstructorLandingComponent', () => {
  let component: InstructorLandingComponent;
  let fixture: ComponentFixture<InstructorLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
