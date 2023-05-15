import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPdfMaterialComponent } from './edit-pdf-material.component';

describe('EditPdfMaterialComponent', () => {
  let component: EditPdfMaterialComponent;
  let fixture: ComponentFixture<EditPdfMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPdfMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPdfMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
