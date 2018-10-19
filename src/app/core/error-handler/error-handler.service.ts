import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerService {

  constructor(private toastr: ToastrService, ) {}

  public handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 403 || error.status === 400 || error.status === 401) {
        const errorObject = JSON.parse(JSON.stringify(error));
        this.toastr.error('Server error', errorObject.message);
      }
    }
  }
}

