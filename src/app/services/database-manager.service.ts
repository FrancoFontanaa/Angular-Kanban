import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {
  constructor(
    private authService: AuthService,
    private db: Firestore
  ){}

  randomCode(length: number): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  async createBoard() {
    let boardId: string = this.randomCode(6);
    await setDoc(doc(this.db, "Boards", (this.authService.User?.uid + "-" + boardId)), {
      img: '',
      title: 'Test board',
      date: Date.now()
    });
    await setDoc(doc(this.db, "Boards", (this.authService.User?.uid + "-" + boardId + "-permissions")), {
      [this.authService.User?.uid as string]: "owner"
    });
    await setDoc(doc(this.db, "Boards", (this.authService.User?.uid + "-" + boardId + "-guests")), {

    });
  }
}
