import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCategoryComponent } from './courses-category.component';

describe('CoursesCategoryComponent', () => {
  let component: CoursesCategoryComponent;
  let fixture: ComponentFixture<CoursesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
