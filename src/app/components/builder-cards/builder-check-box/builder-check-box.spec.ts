import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderCheckBox } from './builder-check-box';

describe('BuilderCheckBox', () => {
  let component: BuilderCheckBox;
  let fixture: ComponentFixture<BuilderCheckBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderCheckBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderCheckBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
