import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTextMaterialComponent } from './edit-text-material.component';

describe('EditTextMaterialComponent', () => {
  let component: EditTextMaterialComponent;
  let fixture: ComponentFixture<EditTextMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTextMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTextMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
