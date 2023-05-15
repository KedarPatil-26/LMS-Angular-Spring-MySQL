import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRequestsComponent } from './course-requests.component';

describe('CourseRequestsComponent', () => {
  let component: CourseRequestsComponent;
  let fixture: ComponentFixture<CourseRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
