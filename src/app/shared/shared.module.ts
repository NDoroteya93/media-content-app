import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsDirective } from './directives/tabs.directive';
import { ModalComponent } from './components/modal/modal.component';
import { EmptyPageComponent } from './components/empty-page/empty-page.component';
import { EmptyListComponent } from './components/empty-list/empty-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TabsDirective, ModalComponent, EmptyPageComponent, EmptyListComponent],
  exports: [TabsDirective, ModalComponent, EmptyPageComponent, EmptyListComponent],
  entryComponents: [ModalComponent]
})
export class SharedModule { }
