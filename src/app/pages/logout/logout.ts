import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  constructor (private authService : AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.authService.logout();
    this.toastr.success("Logged Out")
  }
}
