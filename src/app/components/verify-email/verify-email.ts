import { Component, Input, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service';
import { ToastrService } from 'ngx-toastr';
import { Timer } from "../timer/timer";

@Component({
  selector: 'app-verify-email',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, Timer],
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
  timeLeft = signal(120)
  isVisible = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  sendOtp() {
    this.authService.sendOtp(this.credential).subscribe({
      next: (res) => {
        this.email = res.email;
        this.timeLeft.set(120)
        this.isVisible = true;
        this.takeOtp.set(true);
        if (this.email !== '') {
          const [name, domain] = this.email.split('@');
          const last3 = name.slice(-3);
          this.maskedEmail = `xxxxxxx${last3}@${domain}`;
        }
        this.toastr.info('OTP sent to your registered Mail');
      },
      error: (err) => {
        console.error('Email verification failed', err);
        if(err.status==409){
          this.toastr.info('OTP already sent to email');
        } else {
          this.toastr.error('User with given credentials does not exist');
        }
      },
    });
  }

  verifyOtp() {
    if(this.otp.length!=6){
       this.toastr.warning('Please enter a valid otp')
       return;
    }
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
