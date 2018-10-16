import { BrowserModule } from '@angular/platform-browser';

// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TabsComponent } from './components/layout/tabs/tabs.component';
import { TabComponent } from './components/layout/tabs/tab/tab.component';
import { MediaListComponent } from './components/media/media-list/media-list.component';
import { MediaSearchComponent } from './components/media/media-search/media-search.component';
import { MediaComponent } from './components/media/media.component';
import { MediaCardComponent } from './components/media/media-list/media-card/media-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TabsComponent,
    TabComponent,
    MediaListComponent,
    MediaSearchComponent,
    MediaComponent,
    MediaCardComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule, 
    NgbModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [TabComponent]
})
export class AppModule { }
