import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ThemeEnum } from '../enums/themes.enum';
import { ThemeService } from './theme.service';

export interface ThemeState {
  theme: ThemeEnum;
}

const initialState: ThemeState = {
  theme: ThemeEnum.LIGHT,
};

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, themeService = inject(ThemeService)) => ({
    toggleTheme(): void {
      const theme = themeService.toggleTheme(store.theme());
      patchState(store, (state: ThemeState) => ({ ...state, theme }));
    },
    setTheme(theme: ThemeEnum): void {
      themeService.setTheme(theme);

      patchState(store, (state: ThemeState) => ({ ...state, theme }));
    },
  })),
);
