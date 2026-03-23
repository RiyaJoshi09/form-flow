import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderInputText } from './builder-input-text';

describe('BuilderInputText', () => {
  let component: BuilderInputText;
  let fixture: ComponentFixture<BuilderInputText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderInputText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderInputText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
