import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyForms } from './my-forms';

describe('MyForms', () => {
  let component: MyForms;
  let fixture: ComponentFixture<MyForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyForms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
