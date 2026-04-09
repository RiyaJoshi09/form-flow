import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResponse } from './form-response';

describe('FormResponse', () => {
  let component: FormResponse;
  let fixture: ComponentFixture<FormResponse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormResponse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormResponse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
