import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatError, MatFormField, MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, MatFormField, MatInputModule, MatIconModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  onLogin() {
    if (!this.username || !this.password || !this.email) {
      this.toastr.error('Please enter valid credentials');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.toastr.error('Please enter a valid email address');
      return;
    }

    if (this.password.length < 6) {
      this.toastr.error('Password must be at least 6 characters');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.error('Confirm your password');
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
          this.toastr.error('Invalid credentials');
        },
      });
  }
}
