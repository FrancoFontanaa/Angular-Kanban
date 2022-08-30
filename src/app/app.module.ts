import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { SignInComponent } from './routes/sign-in/sign-in.component';
import { BoardComponent } from './routes/board/board.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { BoardPreviewComponent } from './components/board-preview/board-preview.component';
import { ImageComponent } from './components/image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    BoardComponent,
    NavBarComponent,
    CardComponent,
    BoardPreviewComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyCcIVu7TrbDDwNWgK4Ai2I9vRVKZg-S3Rg",
      authDomain: "angular-kanban-tool.firebaseapp.com",
      projectId: "angular-kanban-tool",
      storageBucket: "angular-kanban-tool.appspot.com",
      messagingSenderId: "747952032347",
      appId: "1:747952032347:web:16f63474f60c507c0e8d7e",
      measurementId: "G-X313VN63YM"
    })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
