import { Component, OnInit } from '@angular/core';
import { Board } from 'src/assets/models';
import { DatabaseService } from 'src/app/services/database.service';
import { BoardsManagerService } from 'src/app/services/boards-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private databaseService: DatabaseService,
    private boardsManager: BoardsManagerService
  ){}

  search: string = '';
  joining: boolean = false;

  boards: Board[] = []

  async ngOnInit() {
    const boardsSnapshot = await this.databaseService.getBoards();
    boardsSnapshot.forEach((board: any) => {
      if (board.id != "UserData"){
        this.boards.push(
          {
            color: board.data()['details'].color,
            title: board.data()['details'].title,
            members: board.data()['details'].members,
            visible: true,
            fav: board.data()['details'].fav,
            date: board.data()['details'].date,
            mode: "normal",
            id: board.id,
            columns: board.data()['columns'] || []
          }
        )
      }
    });
    this.sortBoards()
    this.boardsManager.getUserBoards()
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

  async fav(i: number) {
    this.boards[i].fav = !this.boards[i].fav;
    await this.databaseService.updateBoard(
      this.boards[i].id,
      this.boards[i].title,
      this.boards[i].color,
      this.boards[i].members,
      this.boards[i].date,
      this.boards[i].fav
    )
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
      id: "undefined",
      columns: []
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

  async deleteBoard(boardIndex: number) {
    await this.databaseService.deleteBoard(this.boards[boardIndex].id);
    this.boards.splice(boardIndex, 1);
  }

  async saveEditBoard(boardIndex: number) {
    let title = (document.getElementById("boardPreviewTitleInput-"+boardIndex) as HTMLInputElement).value;
    let color = (document.getElementById("boardPreviewColorInput-"+boardIndex) as HTMLInputElement).value;
    this.boards[boardIndex].title = title;
    this.boards[boardIndex].color = color;
    this.boards[boardIndex].mode = "normal";
    if (this.boards[boardIndex].id == "undefined") {
      let board = await this.databaseService.createBoard(title, color);
      this.boards[boardIndex].id = board.id;
    } else {
      await this.databaseService.updateBoard(
        this.boards[boardIndex].id,
        title,
        color,
        this.boards[boardIndex].members,
        this.boards[boardIndex].date,
        this.boards[boardIndex].fav
      )
    }
  }

  pickBoardColor(boardIndex: number) {
    (document.getElementById("boardPreviewColorInput-"+boardIndex) as HTMLInputElement).click()
  }

  setBoardColor(boardIndex: number) {
    let color = (document.getElementById("boardPreviewColorInput-"+boardIndex) as HTMLInputElement).value;
    this.boards[boardIndex].color = color;
  }
}
