import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOcrMaterialComponent } from './add-ocr-material.component';

describe('AddOcrMaterialComponent', () => {
  let component: AddOcrMaterialComponent;
  let fixture: ComponentFixture<AddOcrMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOcrMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOcrMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
