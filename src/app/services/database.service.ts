import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collectionGroup, doc, Firestore, getDocs, query, where, addDoc, collection, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    private db: Firestore,
    private auth: Auth
  ) { }

  async saveUserProfileData() {
    return await setDoc(doc(this.db, `Users/${this.auth.currentUser?.uid}`), {
      name: this.auth.currentUser?.displayName,
      email: this.auth.currentUser?.email
    }, { merge: true})
  }
}
