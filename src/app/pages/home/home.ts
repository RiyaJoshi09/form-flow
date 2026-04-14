import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MyForms } from '../../components/my-forms/my-forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ThemeSelector } from '../../components/theme-selector/theme-selector';
import { ThemeService } from '../../services/theme-service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SharedWithMe } from '../../components/shared-with-me/shared-with-me';


@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    CommonModule,
    MyForms,
    RouterLink,
    RouterOutlet,
    ThemeSelector,
    MatMenuModule,
    MatButtonModule,
    SharedWithMe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  activesection = 'MyForm';

  constructor(
    private themeService: ThemeService,
    private router: Router,
  ) {}

  ngOnInit() {
    localStorage.setItem(
      'theme',
      localStorage.getItem('prevTheme') || localStorage.getItem('theme') || 'theme-pink',
    );
    localStorage.removeItem('prevTheme');
    this.themeService.loadTheme();
  }
  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.router.navigate(['/logout']);
    }
  }
}
