import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {
  constructor(
    private authService: AuthService
  ){}


}
