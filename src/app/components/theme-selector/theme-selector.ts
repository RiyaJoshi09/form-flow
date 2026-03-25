import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../services/theme-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './theme-selector.html',
  styleUrl: './theme-selector.css'
})
export class ThemeSelector {

  constructor(private themeService: ThemeService) {}

  setTheme(theme: string) {
    this.themeService.setTheme(theme);
  }
}