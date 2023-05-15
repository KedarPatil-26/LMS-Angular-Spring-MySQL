import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoMaterialComponent } from './add-video-material.component';

describe('AddVideoMaterialComponent', () => {
  let component: AddVideoMaterialComponent;
  let fixture: ComponentFixture<AddVideoMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVideoMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVideoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
