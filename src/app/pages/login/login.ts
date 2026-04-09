import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatError, MatFormField, MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service';
import { ToastrService } from 'ngx-toastr';
import { GoogleAuthButton } from "../../components/google-auth-button/google-auth-button";
import { GithubAuthButton } from "../../components/github-auth-button/github-auth-button";

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormField, MatInputModule, MatError, RouterLink, GoogleAuthButton, GithubAuthButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr:ToastrService
  ) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.toastr.error('Please enter username and password');
      return;
    }

    if (this.password.length < 6) {
      this.toastr.error('Password must be at least 6 characters');
      return;
    }

    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
          this.toastr.success("LoggedIn sucessfully")
        },
        error: (err) => {
          console.error('Login failed', err);
          this.toastr.error('Invalid credentials');
        },
      });
  }
}
