import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { SignInComponent } from './routes/sign-in/sign-in.component';
import { BoardComponent } from './routes/board/board.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    BoardComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
