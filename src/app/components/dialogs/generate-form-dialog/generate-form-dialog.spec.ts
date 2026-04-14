import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFormDialog } from './generate-form-dialog';

describe('GenerateFormDialog', () => {
  let component: GenerateFormDialog;
  let fixture: ComponentFixture<GenerateFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
