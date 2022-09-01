import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { BoardsManagerService } from 'src/app/services/boards-manager.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  boardIndex: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    public boardsManager: BoardsManagerService
  ){}

  async ngOnInit() {
    this.boardIndex = parseInt(this.activatedRoute.snapshot.paramMap.get('id') as string) as number;
  }

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
    this.boardsManager.updateBoardColumns(this.boardIndex)
  }

  newColumn() {
    const columnsContainer = document.getElementById('columns-container');
    this.boardsManager.userBoards[this.boardIndex].columns.push(
    {
      title: '',
      cards: [],
      editmode: true
    });
    if (columnsContainer) {
      setTimeout(()=>{columnsContainer.scrollLeft = columnsContainer.scrollWidth;},50)
    }
    this.boardsManager.updateBoardColumns(this.boardIndex)
  }

  editColumn(i: number) {
    this.boardsManager.userBoards[this.boardIndex].columns[i].editmode = true;
  }

  cancelEditColumn(i:number) {
    if (this.boardsManager.userBoards[this.boardIndex].columns[i].title == "") {
      this.boardsManager.userBoards[this.boardIndex].columns.splice(i, 1);
      return
    }
    this.boardsManager.userBoards[this.boardIndex].columns[i].editmode = false;
  }

  deleteColumn(i: number) {
    this.boardsManager.userBoards[this.boardIndex].columns.splice(i, 1);
    this.boardsManager.updateBoardColumns(this.boardIndex)
  }

  saveColumn(i: number, e: KeyboardEvent | null) {
    if (e && e.key != "Enter") {
      return
    }
    this.boardsManager.userBoards[this.boardIndex].columns[i].title = (document.getElementById(`columnTitleInput-${i}`) as HTMLInputElement).value;
    this.boardsManager.userBoards[this.boardIndex].columns[i].editmode = false;
    this.boardsManager.updateBoardColumns(this.boardIndex)
  }

  newCard(i: number) {
    const cardsContainer = document.getElementById('cardsContainer-'+i);
    this.boardsManager.userBoards[this.boardIndex].columns[i].cards.push(
      {
        title: "",
        body: "",
        color: "#ffffff",
        editmode: true
      }
    )
    if (cardsContainer) {
      setTimeout(()=>{
        cardsContainer.scrollTop = cardsContainer.scrollHeight;
      },50)
    }
    this.boardsManager.updateBoardColumns(this.boardIndex);
  }

  editCard(i: number, ci: number) {
    this.boardsManager.userBoards[this.boardIndex].columns[i].cards[ci].editmode = true
  }

  cancelEditCard(i: number, ci: number) {
    if (this.boardsManager.userBoards[this.boardIndex].columns[i].cards[ci].title == "" || this.boardsManager.userBoards[this.boardIndex].columns[i].cards[ci].body == "") {
      this.boardsManager.userBoards[this.boardIndex].columns[i].cards.splice(ci, 1);
      return
    }
    this.boardsManager.userBoards[this.boardIndex].columns[i].cards[ci].editmode = false
  }

  deleteCard(i: number, ci: number) {
    this.boardsManager.userBoards[this.boardIndex].columns[i].cards.splice(ci, 1);
    this.boardsManager.updateBoardColumns(this.boardIndex)
  }

  saveCard(i: number, ci: number) {
    const cardTitleInput = (document.getElementById('cardTitleInput-'+i+'-'+ci) as HTMLInputElement).value;
    const cardBodyInput = (document.getElementById('cardBodyInput-'+i+'-'+ci) as HTMLInputElement).value;
    if (cardTitleInput == "" || cardBodyInput == "") {
      this.boardsManager.userBoards[this.boardIndex].columns[i].cards.splice(ci, 1);
      return
    }
    this.boardsManager.userBoards[this.boardIndex].columns[i].cards[ci].title = cardTitleInput;
    this.boardsManager.userBoards[this.boardIndex].columns[i].cards[ci].color = (document.getElementById('cardColorInput-'+i+'-'+ci) as HTMLInputElement).value;
    this.boardsManager.userBoards[this.boardIndex].columns[i].cards[ci].body = cardBodyInput;
    this.boardsManager.userBoards[this.boardIndex].columns[i].cards[ci].editmode = false;
    this.boardsManager.updateBoardColumns(this.boardIndex)
  }

  pickColorCard(i: number, ci: number) {
    (document.getElementById('cardColorInput-'+i+'-'+ci) as HTMLInputElement).click();
  }

  setColorCard(i: number, ci: number) {
    this.boardsManager.userBoards[this.boardIndex].columns[i].cards[ci].color = (document.getElementById('cardColorInput-'+i+'-'+ci) as HTMLInputElement).value;
    this.boardsManager.updateBoardColumns(this.boardIndex);
  }
}
