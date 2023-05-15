import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftCoursesComponent } from './draft-courses.component';

describe('DraftCoursesComponent', () => {
  let component: DraftCoursesComponent;
  let fixture: ComponentFixture<DraftCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
