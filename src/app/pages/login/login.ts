import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatError, MatFormField, MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormField, MatInputModule, MatError],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email : string = '';
  password : string = '';

  constructor(private router : Router) {}

  onLogin() {

    if(!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    if (this.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    sessionStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/home']);
  }

}
