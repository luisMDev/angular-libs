import { Component, Signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeStore } from '../../services/theme.store';
import { ThemeEnum } from '../../enums/themes.enum';

@Component({
  selector: 'lmdev-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
  standalone: true,
  imports: [FormsModule],
})
export class ThemeSwitcherComponent {
  public ThemeEnum: typeof ThemeEnum = ThemeEnum;

  public themeStore = inject(ThemeStore);

  public theme$$: Signal<string> = this.themeStore.theme;

  public toggleTheme(): void {
    this.themeStore.toggleTheme();
  }
}
