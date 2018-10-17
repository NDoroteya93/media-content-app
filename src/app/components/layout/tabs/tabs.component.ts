import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ComponentFactoryResolver,
  ViewChild,
  Input, 
  ChangeDetectorRef
} from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { TabsDirective } from '../../../shared/directives/tabs.directive';
import { StorageService } from '../../../core/storage/storage.service';
import { StorageData } from '../../../shared/interfaces/storage.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

  @Input() public isStatic: boolean;

  @ContentChildren(TabComponent) public tabs: QueryList<TabComponent>;

  @ViewChild(TabsDirective) public tabPlaceholder;

  public newTabTemplate;
  public dynamicTabs: TabComponent[] = [];

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private storage: StorageService
    ) { }

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

    // Set first Initial Tab
    if (activeTabs.length === 0) {

      this.isStatic
        ? this.selectTab(this.tabs.first)
        : this.createInitialTab(this.tabs.first);
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
    // Update active tabs in the template
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));

    selectedTab.active = true;

    !this.isStatic
      ? this.setStorageData(selectedTab.id)
      : this.setSubtabData(selectedTab);
  }

  /**
   * @name createInitialTab
   * @description Activate the initial tab
   *
   * @param {TabComponent} selectedTab
   * @memberof TabsComponent
   */
  public createInitialTab(selectedTab: TabComponent): void {

    this.tabs.first.id  = `tab-${new Date().getUTCMilliseconds()}`;
    this.tabs.first.active  = true;

    const {active, data, search} = this.tabs.first;

    this.storage.store(selectedTab.id, { active, data, search });
  }

  /**
   * @name openTab
   * @description Get Component factory and fetch the view container reference from appTab directive.
   *  Create a component instance and set the according properties on the component instances
   *
   * @memberof TabsComponent
   */
  public openTab(): void {

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      TabComponent
    );

    const viewContainerRef = this.tabPlaceholder.viewContainerRef;

    const componentRef = viewContainerRef.createComponent(componentFactory);

    const instance: TabComponent = componentRef.instance as TabComponent;
    instance.tabTitle = 'New Tab';
    instance.isCloseable = true;
    instance.template = this.newTabTemplate;
    instance.id = `tab-${new Date().getUTCMilliseconds()}`;

    this.dynamicTabs.push(componentRef.instance as TabComponent);

    // Create initial local storage item
    this.storage.store(instance.id, {data: [], active: false, search: ''});

    // Select the last element after create a new tab
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);

    this.cd.detectChanges();
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

        // Remove item from local storage
        this.storage.clear(selectedTab.id);

        this.selectTab(this.tabs.first);
        return false;
      }
    });
  }

  /**
   * @name setStorageData
   * @description
   *
   * @private
   * @param {string} id
   * @memberof TabsComponent
   */
  private setStorageData(id: string): void {
    const lastActiveTab = this.storage.getStorage().filter(tab => tab.value.active);

    // Set last active element to false
      if (lastActiveTab.length > 0) {
        lastActiveTab[0].value.active = false;
        this.storage.store(lastActiveTab[0].key, {...lastActiveTab[0].value});
      }

      // Set current active element to true
      const storageData: StorageData = this.storage.getItem(id) as StorageData;
      storageData.active = true;

      this.storage.store(id, storageData);
  }

  /**
   * @name setSubtabData
   * @description Get parent tab and set active sub tab
   *
   * @private
   * @param {TabComponent} selectedTab
   * @memberof TabsComponent
   */
  private setSubtabData(selectedTab: TabComponent): void {
    const parentTab = this.storage.getStorage().filter(tab => tab.value.active);
    const parentTabId = parentTab[0].key;

    if (parentTab.length > 0 && parentTab[0].value.data) {

      parentTab[0].value.data
        .forEach(subtab => {
          subtab.active = false;
          if (subtab.title === selectedTab.tabTitle) {
            subtab.active = selectedTab.active;
          }
        });

      this.storage.store(parentTabId, parentTab[0].value, false);
    }
  }

}
