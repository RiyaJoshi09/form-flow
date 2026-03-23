import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderFileUpload } from './builder-file-upload';

describe('BuilderFileUpload', () => {
  let component: BuilderFileUpload;
  let fixture: ComponentFixture<BuilderFileUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderFileUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderFileUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
