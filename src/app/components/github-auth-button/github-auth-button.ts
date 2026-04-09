import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-github-auth-button',
  imports: [],
  templateUrl: './github-auth-button.html',
  styleUrl: './github-auth-button.css',
})
export class GithubAuthButton {

  constructor ( private authService: AuthService) {}

  onGithubSignup() {
    this.authService.githubLogin();
  }
}
