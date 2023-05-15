import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPdfMaterialComponent } from './add-pdf-material.component';

describe('AddPdfMaterialComponent', () => {
  let component: AddPdfMaterialComponent;
  let fixture: ComponentFixture<AddPdfMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPdfMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPdfMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
