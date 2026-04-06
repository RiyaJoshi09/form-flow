import { Component, Input, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email',
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail {
  credential!: string;
  email!: string;
  maskedEmail: string = '';
  otp!: string;
  takeOtp = signal(false);
  @Input() verified!: WritableSignal<string>;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  sendOtp() {
    this.authService.sendOtp(this.credential).subscribe({
      next: (res) => {
        this.email = res.email;
        if (this.email !== '') {
          const [name, domain] = this.email.split('@');
          const last3 = name.slice(-3);
          this.maskedEmail = `xxxxxxx${last3}@${domain}`;
        }
        this.toastr.info('An OTP has been sent to your registered Mail!!');
      },
      error: (err) => {
        console.error('Email verification failed', err);
        if(err.status==409){
          this.toastr.info('OTP already sent to email');
        } else {
          this.toastr.error('Invalid credentials');
        }
      },
    });
    this.takeOtp.set(true);
  }

  verifyOtp() {
    this.authService
      .verifyResetOtp({
        email: this.email,
        otp: this.otp,
      })
      .subscribe({
        next: (res) => {
          this.verified.set(this.email);
          this.toastr.info('OTP verified. Reset your password to move ahead!!!');
        },
        error: (err) => {
          console.error('OTP verification failed', err);
          this.toastr.error('Invalid OTP');
        },
      });
  }
}
