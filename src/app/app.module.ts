import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';

// Modules
import { LayoutModule } from './modules/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
