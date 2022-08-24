import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit(): void {
  }

  columns = [{
    title: 'Column1',
    cards: [{title: "example1", bg: "red", text: "Hola soy juan"}, {title: "example2", bg: "cyan", text: "Hola soy juan"}, {title: "example3", bg: "white", text: "Hola soy josefa"},{title: "example1", bg: "red", text: "Hola soy juan"}, {title: "example2", bg: "cyan", text: "Hola soy juan"}, {title: "example3", bg: "white", text: "Hola soy josefa"},{title: "example1", bg: "red", text: "Hola soy juan"}, {title: "example2", bg: "cyan", text: "Hola soy juan"}, {title: "example3", bg: "white", text: "Hola soy josefa"},{title: "example1", bg: "red", text: "Hola soy juan"}, {title: "example2", bg: "cyan", text: "Hola soy juan"}, {title: "example3", bg: "white", text: "Hola soy josefa"},{title: "example1", bg: "red", text: "Hola soy juan"}, {title: "example2", bg: "cyan", text: "Hola soy juan"}, {title: "example3", bg: "white", text: "Hola soy josefa"},{title: "example1", bg: "red", text: "Hola soy juan"}, {title: "example2", bg: "cyan", text: "Hola soy juan"}, {title: "example3", bg: "white", text: "Hola soy josefa"},{title: "example1", bg: "red", text: "Hola soy juan"}, {title: "example2", bg: "cyan", text: "Hola soy juan"}, {title: "example3", bg: "white", text: "Hola soy josefa"},{title: "example1", bg: "red", text: "Hola soy juan"}, {title: "example2", bg: "cyan", text: "Hola soy juan"}, {title: "example3", bg: "white", text: "Hola soy josefa"}]
  },
  {
    title: 'Column2',
    cards: [{title: "example1", bg: "red", text: "Hola soy juan"}, {title: "example2", bg: "cyan", text: "Hola soy juan"}, {title: "example3", bg: "white", text: "Hola soy josefa"}]
  },
  {
    title: 'Column3',
    cards: [{title: "example1", bg: "red", text: "Hola soy juan"}, {title: "example2", bg: "cyan", text: "Hola soy juan"}, {title: "example3", bg: "white", text: "Hola soy josefa"}]
  },
];

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  newColumn() {
    this.columns.push(
    {
      title: 'new column',
      cards:[{title: "example card", bg: "green", text: "example jijijija"}]
    })
  }

}
