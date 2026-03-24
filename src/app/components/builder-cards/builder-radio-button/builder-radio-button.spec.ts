import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderRadioButton } from './builder-radio-button';

describe('BuilderRadioButton', () => {
  let component: BuilderRadioButton;
  let fixture: ComponentFixture<BuilderRadioButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderRadioButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderRadioButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
