import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderTextarea } from './builder-textarea';

describe('BuilderTextarea', () => {
  let component: BuilderTextarea;
  let fixture: ComponentFixture<BuilderTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderTextarea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderTextarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
