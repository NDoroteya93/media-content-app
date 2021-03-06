import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input('tabTitle') tabTitle: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template;
  @Input() data = [];
  @Input() search = '';
  @Input() id: string;
}
