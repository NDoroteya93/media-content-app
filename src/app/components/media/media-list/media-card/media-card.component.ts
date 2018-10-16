import { Component, OnInit, Input } from '@angular/core';
import { Media } from 'src/app/shared/models/media.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent implements OnInit {

  @Input() public media: Media;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  public open(): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.data = this.media;
  }

}
