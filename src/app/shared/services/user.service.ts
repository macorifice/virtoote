import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { User } from './../model/user.model';

@Injectable()
export class UserService {
  conflictError = new Subject<any[]>();
  readonly users$ = new BehaviorSubject<User[]>(null);
  readonly user$ = new BehaviorSubject<User>(null);
  readonly selectedUserId$ = new BehaviorSubject<number>(null);
  readonly selectedUser$ = new BehaviorSubject<User>(null);

  constructor(private apiService: ApiService) {}

  async getUsers() {
    try {
      const users = await this.apiService.get(`users`);
      this.users$.next(users);
    } catch (err) {
      console.log('Could not load users.', err);
    }
  }

  async getUser(userId: string) {
    return await this.apiService.get(`users/${userId}`);
  }

  async selectUser(userId: string) {
    if (this.users$.value && this.users$.value.length > 0) {
      const user = this.users$.value.find((user) => {
        return user.id === userId;
      });
      this.selectedUser$.next(user);
    }
  }

  async refetchUsers() {
    if (this.selectedUser$.value) {
      await this.getUser(this.selectedUser$.value.id);
    }
  }

  async createUser(user: User) {
    try {
      const createdUser = await this.apiService.post('users', user);
      return createdUser;
    } catch (err) {
      console.log(`Could not Create User`, err);
      throw err;
    }
  }

  async deleteUser(userId: number) {
    const deletedUser = await this.apiService.delete(`users/${userId}`);
    return deletedUser;
  }

  async checkUser(username: string, password: string) {
    return await this.apiService.post('users/authenticate', {
      username,
      password,
    });
  }
}
