import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss']
})
export class BoardPreviewComponent {

  @Output() favEvent = new EventEmitter();
  @Output() shareEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() cancelEditEvent = new EventEmitter();
  @Output() saveEditEvent = new EventEmitter();
  @Output() pickColorEvent = new EventEmitter();
  @Output() setColorEvent = new EventEmitter();
  @Output() cancelJoinRequestEvent = new EventEmitter();

  @Input() title: string = 'Title';
  @Input() color: string = 'cyan';
  @Input() members: number = 1;
  @Input() fav: boolean = false;
  @Input() mode: string = 'normal';
  @Input() index: number = 0;
  @Input() id: string = '';


  favFunc() {this.favEvent.emit()}
  delete(){this.deleteEvent.emit()}
  share(){this.shareEvent.emit()}
  edit(){this.editEvent.emit()}
  cancelEdit(){this.cancelEditEvent.emit()}
  saveEdit(){this.saveEditEvent.emit()}
  cancelJoinRequest(){this.cancelJoinRequestEvent.emit()}
  pickColor(){this.pickColorEvent.emit()}
  setColor(){this.setColorEvent.emit()}

}
