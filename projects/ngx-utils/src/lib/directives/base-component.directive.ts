import { Directive, OnDestroy, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class BaseComponent implements OnDestroy {
  public canonicalUrl: string = '';

  public destroyed$ = new Subject();

  constructor() {}

  public destroyObservable(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnDestroy(): void {
    this.destroyObservable();
  }
}
