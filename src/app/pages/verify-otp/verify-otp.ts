import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
  ) {}

  otp!: string;
  email: string = '';
  maskedEmail: string = '';

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    if (this.email !== '') {
      const [name, domain] = this.email.split('@');
      const last3 = name.slice(-3);
      this.maskedEmail = `xxxxxxx${last3}@${domain}`;
    }
  }

  submit() {
    this.authService.verifyOtp(this.email, this.otp).subscribe({
      next: (res: any) => {
        this.toastr.success('OTP verified successfully');
        this.router.navigate(['/home']);
      },
      error: (err : any) => {
        console.error('OTP verification failed', err);
        this.toastr.error('Invalid OTP');
      },
    });
  }
}
