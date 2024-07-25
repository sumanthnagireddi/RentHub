import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedInuser$ = new BehaviorSubject<any>('')
  constructor() { }
  registerUser(email: string, userName: string, password: string): boolean {
    if (localStorage.getItem(userName) || localStorage.getItem(email)) {
      return false;
    }
    localStorage.setItem(userName, password);
    return true;
  }

  loginUser(username: string, password: string) {
    const storedPassword = localStorage.getItem(username);
    if (storedPassword) {
      if (storedPassword === password) {
        return true;
      }
      return 'Password wrong';
    } else {
      return 'No User Found';
    }
  }

  logoutUser() {
    localStorage.clear();
  }
}
