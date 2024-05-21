import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class BaseComponent implements OnDestroy {
  public canonicalUrl: string = '';

  public destroyed$ = new Subject();

  public destroyObservable(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public ngOnDestroy(): void {
    this.destroyObservable();
  }
}
