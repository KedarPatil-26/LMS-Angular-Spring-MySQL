import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFileMaterialComponent } from './edit-file-material.component';

describe('EditFileMaterialComponent', () => {
  let component: EditFileMaterialComponent;
  let fixture: ComponentFixture<EditFileMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFileMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFileMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
