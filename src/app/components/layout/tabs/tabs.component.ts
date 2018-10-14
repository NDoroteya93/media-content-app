import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ComponentFactoryResolver,
  ViewChild
} from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { TabsDirective } from '../../../shared/directives/tabs.directive';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent) public tabs: QueryList<TabComponent>;

  @ViewChild(TabsDirective) public tabPlaceholder;

  public newTabTemplate;
  public dynamicTabs: TabComponent[] = [];

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

  /**
   *
   * @name ngAfterContentInit
   * @description contentChildren are set and get All active tabs and if there
   * is no active tab set, activate the first
   *
   * @memberof TabsComponent
   */
  public ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  /**
   * @name selectTab
   * @description Diactivate all tabs and activate the tab that user has clicked on
   *
   * @param {TabComponent} selectedTab
   * @memberof TabsComponent
   */
  public selectTab(selectedTab: TabComponent): void {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));

    selectedTab.active = true;
  }

  /**
   * @name openTab
   * @description Get Component factory and fetch the view container reference from appTab directive.
   *  Create a component instance and set the according properties on the component instances
   *
   * @param {*} template
   * @param {*} data
   * @param {boolean} [isCloseable=false]
   * @param {string} [title='New Tab']
   * @memberof TabsComponent
   */
  public openTab(isCloseable: boolean = true, template: any = this.newTabTemplate, title: string = 'New Tab'): void {

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      TabComponent
    );

    const viewContainerRef = this.tabPlaceholder.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);

    const tabId = `tab-${this.dynamicTabs.length}`;

    const instance: TabComponent = componentRef.instance as TabComponent;
    instance.tabTitle = title;
    instance.isCloseable = isCloseable;
    instance.template = template;
    // instance.data = data;
    instance.id = tabId;

    this.dynamicTabs.push(componentRef.instance as TabComponent);

    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  /**
   * @name closeTab
   * @description Remove the tab from dynamicTabs Array and destroy the dynamic tab component
   *
   * @param {TabComponent} selectedTab
   * @memberof TabsComponent
   */
  public closeTab(selectedTab: TabComponent): void {
    this.dynamicTabs.forEach((tab, i) => {
      if (tab === selectedTab) {

        this.dynamicTabs.splice(i, 1);

        const viewContainerRef = this.tabPlaceholder.viewContainerRef;

        viewContainerRef.remove(i);

        this.selectTab(this.tabs.last);
        return false;
      }
    });
  }

}
