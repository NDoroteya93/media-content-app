import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsDirective } from './directives/tabs.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TabsDirective],
  exports: [TabsDirective]
})
export class SharedModule { }
