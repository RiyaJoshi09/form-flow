import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-oauth-callback',
  imports: [],
  templateUrl: './oauth-callback.html',
  styleUrl: './oauth-callback.css',
})
export class OauthCallback implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.handleOAuthCallback();
  }
}