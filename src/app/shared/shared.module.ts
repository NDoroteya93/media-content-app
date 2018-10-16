import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsDirective } from './directives/tabs.directive';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TabsDirective, ModalComponent],
  exports: [TabsDirective, ModalComponent], 
  entryComponents: [ModalComponent]
})
export class SharedModule { }
