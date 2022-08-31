import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collectionGroup, doc, Firestore, getDocs, query, where, addDoc, collection, updateDoc } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BoardsManagerService {
  constructor(
    private db: Firestore,
    private auth: Auth
  ) { }

  userBoards: any[] = [];
  async getUserBoards() {
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
        owner: Object.keys(board.data()['permissions']).filter(uid => board.data()['permissions'][uid] == "owner"),
        columns: board.data()['columns']
      })
    });
  }

  async createBoard() {
    const uid = this.auth.currentUser?.uid as string;
    const newBoard = {
      color: "#000000",
      editColor: "#000000",
      title: "",
      members: 1,
      visible: true,
      fav: false,
      date: Date.now(),
      mode: "edit",
      id: "undefined",
      owner: uid,
      columns: []
    }
    const dbBoard = await addDoc(collection(this.db, `Users/${uid}/Boards`), {
      columns: [],
      details: {
        color: newBoard.color,
        date: newBoard.date,
        fav: newBoard.fav,
        title: newBoard.title
      },
      permissions: {
        [uid]: "owner"
      }
    });
    newBoard.id = dbBoard.id;
    this.userBoards.push(newBoard);
  }

  async deleteBoard(boardIndex: number) {
    const boardId = this.userBoards[boardIndex].id;
    this.userBoards.splice(boardIndex, 1);
    await deleteDoc(doc(this.db, `Users/${this.auth.currentUser?.uid as string}/Boards/${boardId}`));
  }

  async updateBoardDetails(boardIndex: number) {
    const board = this.userBoards[boardIndex];
    this.userBoards[boardIndex].mode = "normal"
    await updateDoc(doc(this.db, `Users/${board.owner}/Boards/${board.id}`),{
      details: {
        title: this.userBoards[boardIndex].title,
        color: this.userBoards[boardIndex].color,
        date: this.userBoards[boardIndex].date,
        fav: this.userBoards[boardIndex].fav,
      }
    })
  }

  async updateBoardColumns(boardIndex: number) {
    const board = this.userBoards[boardIndex];
    await updateDoc(doc(this.db, `Users/${board.owner}/Boards/${board.id}`),{
      columns: this.userBoards[boardIndex].columns
    });
  }
}
