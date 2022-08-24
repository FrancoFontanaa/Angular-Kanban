import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './routes/board/board.component';
import { HomeComponent } from './routes/home/home.component';
import { SignInComponent } from './routes/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'board',
    component: BoardComponent
  },
  {
    path: '**',
    redirectTo: 'signIn'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
