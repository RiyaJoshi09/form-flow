import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionControl } from './version-control';

describe('VersionControl', () => {
  let component: VersionControl;
  let fixture: ComponentFixture<VersionControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionControl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
