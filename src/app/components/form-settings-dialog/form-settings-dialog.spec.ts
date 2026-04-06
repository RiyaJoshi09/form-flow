import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSettingsDialog } from './form-settings-dialog';

describe('FormSettingsDialog', () => {
  let component: FormSettingsDialog;
  let fixture: ComponentFixture<FormSettingsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSettingsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSettingsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
