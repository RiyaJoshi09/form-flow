import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubAuthButton } from './github-auth-button';

describe('GithubAuthButton', () => {
  let component: GithubAuthButton;
  let fixture: ComponentFixture<GithubAuthButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubAuthButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubAuthButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
