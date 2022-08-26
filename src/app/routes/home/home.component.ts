import { Component } from '@angular/core';
import { Board } from 'src/assets/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  search: string = '';

  boards: Board[] = [
    {
      img: "../../assets/visuals/vinciu.svg",
      title: "VinciU Tasks",
      members: 3,
      visible: true,
      fav: true,
      date: Date.now()
    },
    {
      img: "../../assets/visuals/vinciu.svg",
      title: "Google Tasks",
      members: 3,
      visible: true,
      fav: false,
      date: Date.now() + 1
    }
  ]

  filterBoards() {
    const lowerSearch = this.search.toLowerCase();
    this.boards.forEach(board => {
      if (board.title.toLowerCase().includes(lowerSearch)) {
        board.visible = true
      } else {
        board.visible = false
      }
    })
  }

  sortBoards() {
    let sortingOrder = (document.getElementById("sorting-order") as HTMLInputElement).value;
    switch (sortingOrder) {
      case "newest":
        this.boards.forEach(board => {
          board.visible = true
        });
        this.boards.sort((a,b)=>(a.date-b.date))
        break;
      case "oldest":
        this.boards.forEach(board => {
          board.visible = true
        });
        this.boards.sort((a,b)=>(b.date-a.date))
        break;
      case "fav":
        this.boards.forEach(board => {
          if(!board.fav){
            board.visible = false
          }
        })
        break;
    }
  }

  fav(i: number) {
    this.boards[i].fav = !this.boards[i].fav;
    console.log(this.boards[i].fav, i)
  }
}
