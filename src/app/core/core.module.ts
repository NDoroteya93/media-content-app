import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from './media/media.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './storage/storage.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [MediaService, StorageService]
})
export class CoreModule { }
