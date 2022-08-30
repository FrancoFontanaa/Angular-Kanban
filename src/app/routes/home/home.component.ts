import { Component, OnInit } from '@angular/core';
import { Board } from 'src/assets/models';
import { Router } from '@angular/router';
import { DatabaseManagerService } from 'src/app/services/database-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private databaseManagerService: DatabaseManagerService
  ){}

  search: string = '';
  joining: boolean = false;

  boards: Board[] = [
    {
      color: "cyan",
      title: "VinciU Tasks",
      members: 3,
      visible: true,
      fav: true,
      date: Date.now(),
      mode: "normal",
      id: ""
    },
    {
      color: "lime",
      title: "Google Tasks",
      members: 3,
      visible: true,
      fav: false,
      date: Date.now() + 1,
      mode: "normal",
      id: ""
    }
  ]

  ngOnInit() {
    this.sortBoards()
  }

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
      case "oldest":
        this.boards.forEach(board => {
          board.visible = true
        });
        this.boards.sort((a,b)=>(a.date-b.date))
        break;
      case "newest":
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

  toggleJoining() {
    this.joining = !this.joining
  }

  newBoard() {
    (document.getElementById("sorting-order") as HTMLInputElement).value = "newest";
    this.boards.push({
      color:"#ffffff",
      title:"",
      members:1,
      visible:true,
      fav:false,
      date:Date.now(),
      mode:"edit",
      id: this.databaseManagerService.randomCode(6)
    })
    this.sortBoards()
  }

  cancelEditBoard(boardIndex: number) {
    let title = (document.getElementById("boardPreviewTitleInput-"+boardIndex) as HTMLInputElement).value;
    if (title == "") {
      return this.deleteBoard(boardIndex);
    }
    return this.boards[boardIndex].mode = "normal"
  }

  editBoard(boardIndex: number){
    this.boards[boardIndex].mode = "edit"
  }

  deleteBoard(boardIndex: number) {
    this.boards.splice(boardIndex, 1);
  }

  saveEditBoard(boardIndex: number) {
    let title = (document.getElementById("boardPreviewTitleInput-"+boardIndex) as HTMLInputElement).value;
    let color = (document.getElementById("boardPreviewColorInput-"+boardIndex) as HTMLInputElement).value;
    this.boards[boardIndex].title = title;
    this.boards[boardIndex].color = color;
    this.boards[boardIndex].mode = "normal"
  }

  pickBoardColor(boardIndex: number) {
    (document.getElementById("boardPreviewColorInput-"+boardIndex) as HTMLInputElement).click()
  }

  setBoardColor(boardIndex: number) {
    let color = (document.getElementById("boardPreviewColorInput-"+boardIndex) as HTMLInputElement).value;
    this.boards[boardIndex].color = color;
  }
}
