import { ValidatorFn, Validators } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  return Validators.pattern(urlPattern);
}
