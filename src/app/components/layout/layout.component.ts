import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MediaListComponent } from '../media/media-list/media-list.component';
import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {

  @ViewChild('mediaList') public mediaListTemplate: MediaListComponent;
  @ViewChild(TabsComponent) public tabsComponent: TabsComponent;

  public ngAfterViewInit(): void { 
    this.tabsComponent.newTabTemplate = this.mediaListTemplate;
  }

}
