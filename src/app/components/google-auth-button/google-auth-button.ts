import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-google-auth-button',
  imports: [],
  templateUrl: './google-auth-button.html',
  styleUrl: './google-auth-button.css',
})
export class GoogleAuthButton {

  constructor ( private authService: AuthService) {}

  onGoogleSignup() {
    this.authService.googleLogin();
  }
}
