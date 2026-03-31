import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MyForms } from '../../components/my-forms/my-forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ThemeSelector } from '../../components/theme-selector/theme-selector';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, CommonModule, MyForms, RouterLink, RouterOutlet,ThemeSelector],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  activesection="MyForm";

  constructor(private themeService: ThemeService ) {}

  ngOnInit() {
    localStorage.setItem('theme',localStorage.getItem('prevTheme') || localStorage.getItem('theme')  || 'theme-pink')
    localStorage.removeItem('prevTheme');
    this.themeService.loadTheme();
  }
  
}
