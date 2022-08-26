import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Column } from 'src/assets/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  columns: Column[] = [];

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
    const columnsContainer = document.getElementById('columns-container');
    this.columns.push(
    {
      title: '',
      cards: [],
      editmode: true
    });
    if (columnsContainer) {
      setTimeout(()=>{columnsContainer.scrollLeft = columnsContainer.scrollWidth;},50)
    }
  }

  editColumn(i: number) {
    this.columns[i].editmode = true;
  }

  cancelEditColumn(i:number) {
    if (this.columns[i].title == "") {
      this.columns.splice(i, 1);
      return
    }
    this.columns[i].editmode = false;
  }

  deleteColumn(i: number) {
    this.columns.splice(i, 1);
  }

  saveColumn(i: number, e: KeyboardEvent | null) {
    if (e && e.key != "Enter") {
      return
    }
    this.columns[i].title = (document.getElementById(`columnTitleInput-${i}`) as HTMLInputElement).value;
    this.columns[i].editmode = false;
  }

  newCard(i: number) {
    const cardsContainer = document.getElementById('cardsContainer-'+i);
    this.columns[i].cards.push(
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
  }

  editCard(i: number, ci: number) {
    this.columns[i].cards[ci].editmode = true
  }

  cancelEditCard(i: number, ci: number) {
    if (this.columns[i].cards[ci].title == "" || this.columns[i].cards[ci].body == "") {
      this.columns[i].cards.splice(ci, 1);
      return
    }
    this.columns[i].cards[ci].editmode = false
  }

  deleteCard(i: number, ci: number) {
    this.columns[i].cards.splice(ci, 1)
  }

  saveCard(i: number, ci: number) {
    const cardTitleInput = (document.getElementById('cardTitleInput-'+i+'-'+ci) as HTMLInputElement).value;
    const cardBodyInput = (document.getElementById('cardBodyInput-'+i+'-'+ci) as HTMLInputElement).value;
    if (cardTitleInput == "" || cardBodyInput == "") {
      this.columns[i].cards.splice(ci, 1);
      return
    }
    this.columns[i].cards[ci].title = cardTitleInput;
    this.columns[i].cards[ci].color = (document.getElementById('cardColorInput-'+i+'-'+ci) as HTMLInputElement).value;
    this.columns[i].cards[ci].body = cardBodyInput;
    this.columns[i].cards[ci].editmode = false
  }

  pickColorCard(i: number, ci: number) {
    (document.getElementById('cardColorInput-'+i+'-'+ci) as HTMLInputElement).click();
  }

  setColorCard(i: number, ci: number) {
    this.columns[i].cards[ci].color = (document.getElementById('cardColorInput-'+i+'-'+ci) as HTMLInputElement).value
  }
}
