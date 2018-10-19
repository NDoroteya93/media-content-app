import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from './media/media.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from './storage/storage.service';
import { ErrorHandlerService } from './error-handler/error-handler.service';
import { ServerErrorsInterceptor } from './server-errors-interceptor/server-errors-interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    MediaService,
    StorageService,
    ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
