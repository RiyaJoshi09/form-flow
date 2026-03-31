import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MyForms } from '../../components/my-forms/my-forms';
import { Router, RouterLink } from '@angular/router';
import { ThemeSelector } from '../../components/theme-selector/theme-selector';
import { ThemeService } from '../../services/theme-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, CommonModule, MyForms, RouterLink, ThemeSelector],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  activesection = 'MyForm';
  showProfileMenu = false;
  username = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    localStorage.setItem(
      'theme',
      localStorage.getItem('prevTheme') || localStorage.getItem('theme') || 'theme-pink',
    );
    localStorage.removeItem('prevTheme');
    this.themeService.loadTheme();
    this.username = this.authService.getUsername() || '';
  }

  toggleProfileMenu(event: MouseEvent) {
    event.stopPropagation();
    this.showProfileMenu = !this.showProfileMenu;
  }

  @HostListener('document:click')
  closeProfileMenu() {
    this.showProfileMenu = false;
  }

  onLogout() {
    this.authService.logout();
    this.showProfileMenu = false;
    this.router.navigate(['/login']);
  }
}
