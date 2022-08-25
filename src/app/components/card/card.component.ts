import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/assets/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  @Output() pickColorEvent = new EventEmitter();
  @Output() setColorEvent = new EventEmitter();

  @Input() card: Card = {
    title: "Put a title...",
    body: "Write something...",
    color: "white",
    editmode: false
  };
  @Input() ici: number[] = [];

  edit(){
    this.editEvent.emit()
  }
  delete(){
    this.deleteEvent.emit()
  }
  save(e: KeyboardEvent | null){
    if (e && e.key != "Enter") {
      return
    }
    this.saveEvent.emit()
  }
  cancel(){
    this.cancelEvent.emit()
  }
  pickColor(){
    this.pickColorEvent.emit()
  }
  setColor(){
    this.setColorEvent.emit()
  }
}
