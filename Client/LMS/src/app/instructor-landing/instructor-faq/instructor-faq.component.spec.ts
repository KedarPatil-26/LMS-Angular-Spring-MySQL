import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorFaqComponent } from './instructor-faq.component';

describe('InstructorFaqComponent', () => {
  let component: InstructorFaqComponent;
  let fixture: ComponentFixture<InstructorFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorFaqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
