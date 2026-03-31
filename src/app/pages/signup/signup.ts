import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, MatFormField, MatInputModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
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
      .signup({
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
