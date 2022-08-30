import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, addDoc, collection, getDocs, query, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    private auth: Auth,
    private db: Firestore
  ){
  }

  boards: any;

  async createBoard(title: string, color: string) {
    let userId = this.auth.currentUser?.uid as string;
    let board = await addDoc(collection(this.db, userId), {
      columns: [],
      details: {
        color: color,
        members: 1,
        title: title,
        date: Date.now(),
        fav: false
      },
      permissions: {
        [userId]: "owner"
      }
    });
    await addDoc(collection(this.db, `Users/${userId}/Boards`), {
      columns: [],
      details: {
        color: color,
        members: 1,
        title: title,
        date: Date.now(),
        fav: false
      },
      permissions: {
        [userId]: "owner"
      }
    });
    return board
  }

  async getBoards() {
    this.boards = await getDocs(query(collection(this.db, this.auth.currentUser?.uid as string)));
    return this.boards;
  }

  async getBoard(boardId: string) {

  }

  async updateBoard(boardId: string, title: string, color: string, members: number, date: number, fav: boolean) {
    await updateDoc(doc(this.db, `${this.auth.currentUser?.uid as string}/${boardId}`),{
      details: {
        title: title,
        color: color,
        members: members,
        date: date,
        fav: fav
      }
    })
  }

  async deleteBoard(boardId: string) {
    await deleteDoc(doc(this.db, `${this.auth.currentUser?.uid as string}/${boardId}`))
  }

  async getRecent() {

  }


}
