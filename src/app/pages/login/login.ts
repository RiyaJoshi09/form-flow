import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatError, MatFormField, MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormField, MatInputModule, MatError],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  onLogin() {
    if (!this.username || !this.password) {
      alert('Please enter username and password');
      return;
    }

    if (this.password.length < 6) {
      alert('Password must be at least 6 characters');
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
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid credentials');
        },
      });
  }
}
