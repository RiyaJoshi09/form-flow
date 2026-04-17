import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateForm } from './generate-form';

describe('GenerateForm', () => {
  let component: GenerateForm;
  let fixture: ComponentFixture<GenerateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
