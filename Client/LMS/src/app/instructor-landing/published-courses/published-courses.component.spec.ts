import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedCoursesComponent } from './published-courses.component';

describe('PublishedCoursesComponent', () => {
  let component: PublishedCoursesComponent;
  let fixture: ComponentFixture<PublishedCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
