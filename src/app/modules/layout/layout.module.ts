import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TabsComponent, TabComponent, LayoutComponent], 
  exports: [LayoutComponent]
})
export class LayoutModule { }
