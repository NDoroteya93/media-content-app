import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TabsComponent } from './components/layout/tabs/tabs.component';
import { TabComponent } from './components/layout/tabs/tab/tab.component';
import { MediaListComponent } from './components/media/media-list/media-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TabsComponent,
    TabComponent,
    MediaListComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent], 
  entryComponents: [TabComponent]
})
export class AppModule { }
