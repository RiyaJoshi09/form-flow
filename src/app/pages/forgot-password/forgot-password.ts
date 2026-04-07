import { Component, signal } from '@angular/core';
import { ChangePassword } from "../../components/change-password/change-password";
import { VerifyEmail } from '../../components/verify-email/verify-email';


@Component({
  selector: 'app-forgot-password',
  imports: [ChangePassword, VerifyEmail],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  verified = signal('');
}
