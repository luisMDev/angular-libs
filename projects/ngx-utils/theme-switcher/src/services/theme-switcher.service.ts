import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, WritableSignal, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  public theme$$: WritableSignal<string> = signal<string>('light');

  public platformId: object = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const initialTheme = this.getInitialTheme();
      this.setTheme(initialTheme);
    }
  }

  public toggleTheme(): void {
    const newTheme = this.theme$$() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  public setTheme(theme: string): void {
    this.theme$$.set(theme);
    const body = document.body as HTMLElement;
    body.setAttribute('data-bs-theme', theme);

    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        console.error('Error setting theme in local storage:', error);
      }
    }
  }

  private getInitialTheme(): string {
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem('theme');
      return theme || 'light';
    }
    return 'light';
  }
}
