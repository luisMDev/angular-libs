import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrWrapperService {
  constructor(private toastrService: ToastrService) {}

  public showError(message: string = '', title: string = ''): void {
    console.error(`${title}: ${message}`);
    this.toastrService.error(message, title);
  }
}
