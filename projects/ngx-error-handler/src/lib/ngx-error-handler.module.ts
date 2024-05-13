import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ErrorHandler,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalConfig, ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { GlobalErrorHandler } from './services/error-handler.service';
import { ToastrWrapperService } from './services/toastr-wrapper.service';

export const Params = new InjectionToken<string[]>('params');

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserAnimationsModule, ToastrModule.forRoot()],
  providers: [
    ToastrWrapperService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
      deps: [],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [ToastrWrapperService],
    },
  ],
})
export class NgxErrorHandlerModule {}
