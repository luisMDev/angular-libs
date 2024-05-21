import { HttpErrorResponse } from '@angular/common/http';
import {
  ErrorHandler,
  Inject,
  Injectable,
  Injector,
  NgZone,
} from '@angular/core';
import { ToastrWrapperService } from './toastr-wrapper.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(
    private zone: NgZone,
    @Inject(Injector) private readonly injector: Injector
  ) {
    super();
  }

  override handleError(error: any) {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }

    const errorMessage = `${error?.status} ${error?.message}`;

    this.zone.run(() => this.toastService.showError(errorMessage));

    super.handleError(error);
  }

  private get toastService(): ToastrWrapperService {
    return this.injector.get(ToastrWrapperService);
  }
}
