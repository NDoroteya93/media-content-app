import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from './media/media.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [MediaService]
})
export class CoreModule { }
