import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSettingsMarks } from './form-settings-marks';

describe('FormSettingsMarks', () => {
  let component: FormSettingsMarks;
  let fixture: ComponentFixture<FormSettingsMarks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSettingsMarks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSettingsMarks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
