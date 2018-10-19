import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        retry(5),
        tap(
          (event: HttpEvent<any>) => { },
          (err: HttpErrorResponse | Error) => {
            const errorHandler = this.injector.get(ErrorHandlerService);

            errorHandler.handleError(err);

            return throwError(err);
          }
        )
      );
  }
}
