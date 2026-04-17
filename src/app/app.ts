import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service';
import { Loader } from "./components/loader/loader";
import { LoaderService } from './services/loader-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private authService: AuthService, private loaderService :LoaderService) {
    this.authService.initializeAuthSession().subscribe();
  }
  show = computed(() => this.loaderService.isLoading());

}
