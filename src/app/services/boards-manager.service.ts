import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { collectionGroup, doc, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Board } from 'src/assets/models';

@Injectable({
  providedIn: 'root'
})
export class BoardsManagerService {
  constructor(
    private db: Firestore,
    private auth: Auth
  ) { }

  userBoards: any = [];
  async getUserBoards(){
    const searchQuery = query(collectionGroup(this.db, "Boards"), where(`permissions.${this.auth.currentUser?.uid as string}`, "!=", null));
    const boards = await getDocs(searchQuery);
    this.userBoards = [];
    boards.forEach(board => {
      this.userBoards.push({
        color: board.data()['details'].color,
        title: board.data()['details'].title,
        members: Object.keys(board.data()['permissions']).length,
        visible: true,
        fav: board.data()['details'].fav,
        date: board.data()['details'].date,
        mode: "normal",
        id: board.id,
        columns: board.data()['columns']
      })
    });
  }

  async createBoard() {}

  newBoard() {
    this.userBoards.push({
      color:"#000000",
      title:"",
      members:1,
      visible:true,
      fav:false,
      date:Date.now(),
      mode:"edit",
      id: "undefined",
      columns: []
    })
  }
}
