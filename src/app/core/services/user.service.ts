import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { users } from '@data/user.data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUsername(id: number): User | undefined {
    return users.find((item) => item.id === id);
  }
}
