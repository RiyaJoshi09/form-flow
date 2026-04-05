import { Component, Input, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-verify-email',
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail {
  credential!: string;
  otp!: string;
  takeOtp = signal(false);
  @Input() verified!:WritableSignal<boolean>;

  submit() {
    this.takeOtp.set(true);
  }

  verifyOtp() {
    this.verified.set(true);
  }
}
