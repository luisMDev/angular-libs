import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { ThemeEnum } from '../enums/themes.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public platformId: object = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const initialTheme: ThemeEnum = this.getInitialTheme();
      this.setTheme(initialTheme);
    }
  }

  public toggleTheme(theme: ThemeEnum): ThemeEnum {
    const newTheme = theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    this.setTheme(newTheme);
    return newTheme;
  }

  public setTheme(theme: ThemeEnum): void {
    const body: HTMLElement = document.body as HTMLElement;

    body.setAttribute('data-bs-theme', theme);

    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        console.error('Error setting theme in local storage:', error);
      }
    }
  }

  private getInitialTheme(): ThemeEnum {
    if (isPlatformBrowser(this.platformId)) {
      const theme: ThemeEnum = localStorage.getItem('theme') as ThemeEnum;
      return theme || ThemeEnum.LIGHT;
    }
    return ThemeEnum.LIGHT;
  }
}
