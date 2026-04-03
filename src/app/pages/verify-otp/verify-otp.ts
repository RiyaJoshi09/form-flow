import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-otp',
  imports: [MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css',
})
export class VerifyOtp {
  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}
  
  otp!: string;

  maskedEmail = computed(() => {
    const email = this.authService.mail();
    if (!email) return '';

    const [name, domain] = email.split('@');
    const last3 = name.slice(-3);

    return `xxxxxxx${last3}@${domain}`;
  });

  submit() {
    // this.authService.verifyOtp(this.otp).subscribe({
    //   next: (res: any) => {
    //     this.toastr.success('OTP verified successfully ✅');
    //     this.router.navigate(['/home']);
    //   },
    //   error: (err : any) => {
    //     console.error('OTP verification failed', err);
    //     this.toastr.error('Invalid OTP ❌');
    //   },
    // });
  }
}
