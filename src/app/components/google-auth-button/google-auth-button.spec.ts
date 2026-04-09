import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthButton } from './google-auth-button';

describe('GoogleAuthButton', () => {
  let component: GoogleAuthButton;
  let fixture: ComponentFixture<GoogleAuthButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAuthButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleAuthButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
