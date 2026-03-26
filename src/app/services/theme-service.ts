import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themes = [
  'theme-blue',
  'theme-pink',
  'theme-green',
  'theme-orange'
];

  setTheme(theme: string) {
    const body = document.body;

    this.themes.forEach(t => body.classList.remove(t));
    body.classList.add(theme);

    localStorage.setItem('theme', theme);
  }

  loadTheme() {
    const saved = localStorage.getItem('theme') || 'theme-pink';
    this.setTheme(saved);
  }
}