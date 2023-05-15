import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideoMaterialComponent } from './edit-video-material.component';

describe('EditVideoMaterialComponent', () => {
  let component: EditVideoMaterialComponent;
  let fixture: ComponentFixture<EditVideoMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVideoMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVideoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
