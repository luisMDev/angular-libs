import { ValidatorFn, Validators } from '@angular/forms';

export function hexColorValidator(): ValidatorFn {
  const hexPattern = /^#[0-9A-F]{6}$/i;

  return Validators.pattern(hexPattern);
}
