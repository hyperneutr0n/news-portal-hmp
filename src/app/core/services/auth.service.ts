import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { User } from '@models/user.model';
import { users } from '@data/user.data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = users;
  private currentUserKey = 'currentUser';
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {}

  isLoggedIn(): boolean {
    return !!this.storageService.getItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {
    return this.storageService.getItem(this.currentUserKey);
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );
    if (user) {
      const { password, ...userToStore } = user;
      this.storageService.setItem(this.currentUserKey, userToStore);
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.storageService.removeItem(this.currentUserKey);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
