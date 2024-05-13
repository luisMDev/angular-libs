import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrWrapperService } from '../services/toastr-wrapper.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastrWrapperService: ToastrWrapperService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage = '';

        console.log('HttpErrorInterceptor', error);

        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `${error.error.message}`;
        } else {
          // backend error
          errorMessage = `${error.error.message}`;
        }

        // here you could add code to show the error in some fixed part of the screen.
        this.toastrWrapperService.showError(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
