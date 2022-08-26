import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss']
})
export class BoardPreviewComponent {

  @Output() favEvent = new EventEmitter();

  @Input() title: string = 'Title';
  @Input() img: string = '../../../assets/visuals/vinciu.svg';
  @Input() members: number = 1;
  @Input() fav: boolean = false;

  favFunc() {
    this.favEvent.emit()
  }

}
