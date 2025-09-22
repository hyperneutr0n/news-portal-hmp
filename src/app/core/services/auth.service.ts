import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { User } from '@app/models/user.model';
import { users } from "@app/data/user.data";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = users;
  private currentUserKey = 'currentUser';
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  isLoggedIn(): boolean {
    return !!this.storageService.getItem(this.currentUserKey);
  }
  
  isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCurrentUser(): User | null {
    return this.storageService.getItem(this.currentUserKey);
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
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

  addFavorite(newsId: number): void {
    const user = this.getCurrentUser();
    if (user && !user.favorites.includes(newsId)) {
      user.favorites.push(newsId);
      this.storageService.setItem(this.currentUserKey, user);
    }
  }

  removeFavorite(newsId: number): void {
    const user = this.getCurrentUser();
    if (user) {
      user.favorites = user.favorites.filter(id => id !== newsId);
      this.storageService.setItem(this.currentUserKey, user);
    }
  }
}
