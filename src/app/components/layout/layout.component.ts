import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaListComponent } from '../media/media-list/media-list.component';
import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild('mediaList') public mediaListTemplate: MediaListComponent;
  @ViewChild(TabsComponent) public tabsComponent: TabsComponent;

  constructor() { }

  public ngOnInit(): void {
  }

  public onSearchMedia(): void {
    this.tabsComponent.openTab(this.mediaListTemplate, {});
  }

}
