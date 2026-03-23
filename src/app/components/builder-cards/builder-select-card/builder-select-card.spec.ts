import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderSelectCard } from './builder-select-card';

describe('BuilderSelectCard', () => {
  let component: BuilderSelectCard;
  let fixture: ComponentFixture<BuilderSelectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderSelectCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderSelectCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
