import { Component, Signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeSwitcherService } from '../../public_api';

@Component({
  selector: 'lmdev-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
  standalone: true,
  imports: [FormsModule],
})
export class ThemeSwitcherComponent {
  public themeSwitcherService: ThemeSwitcherService = inject(ThemeSwitcherService);

  public theme$$: Signal<string> = this.themeSwitcherService.theme$$;

  public toggleTheme(): void {
    this.themeSwitcherService.toggleTheme();
  }
}
