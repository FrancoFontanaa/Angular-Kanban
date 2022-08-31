import { Component, OnInit } from '@angular/core';
import { BoardsManagerService } from 'src/app/services/boards-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public boardsManager: BoardsManagerService
  ){}

  search: string = '';
  joining: boolean = false;

  async ngOnInit() {
    await this.boardsManager.getUserBoards();
    this.sortBoards();
  }

  filterBoards() {
    const lowerSearch = this.search.toLowerCase();
    this.boardsManager.userBoards.forEach(board => {
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
        this.boardsManager.userBoards.forEach(board => {
          board.visible = true
        });
        this.boardsManager.userBoards.sort((a,b)=>(a.date-b.date))
        break;
      case "newest":
        this.boardsManager.userBoards.forEach(board => {
          board.visible = true
        });
        this.boardsManager.userBoards.sort((a,b)=>(b.date-a.date))
        break;
      case "fav":
        this.boardsManager.userBoards.forEach(board => {
          if(!board.fav){
            board.visible = false
          }
        })
        break;
    }
  }

  async fav(boardIndex: number) {
    this.boardsManager.userBoards[boardIndex].fav = !this.boardsManager.userBoards[boardIndex].fav;
    this.boardsManager.updateBoardDetails(boardIndex)
  }

  async newBoard() {
    await this.boardsManager.createBoard();
    this.sortBoards()
  }

  cancelEditBoard(boardIndex: number) {
    let title = (document.getElementById("boardPreviewTitleInput-"+boardIndex) as HTMLInputElement).value;
    if (title == "") {
      this.boardsManager.deleteBoard(boardIndex);
      this.sortBoards()
    } else {
      this.boardsManager.userBoards[boardIndex].mode = "normal"
    }
  }

  editBoard(boardIndex: number){
    this.boardsManager.userBoards[boardIndex].mode = "edit"
  }

  saveEditBoard(boardIndex: number) {
    let title = (document.getElementById("boardPreviewTitleInput-"+boardIndex) as HTMLInputElement).value;
    let color = (document.getElementById("boardPreviewColorInput-"+boardIndex) as HTMLInputElement).value;
    this.boardsManager.userBoards[boardIndex].title = title;
    this.boardsManager.userBoards[boardIndex].color = color;
    this.boardsManager.updateBoardDetails(boardIndex)
    this.sortBoards()
  }

  pickBoardColor(boardIndex: number) {
    (document.getElementById("boardPreviewColorInput-"+boardIndex) as HTMLInputElement).click()
  }

  setBoardColor(boardIndex: number) {
    let color = (document.getElementById("boardPreviewColorInput-"+boardIndex) as HTMLInputElement).value;
    this.boardsManager.userBoards[boardIndex].editColor = color;
  }
}
