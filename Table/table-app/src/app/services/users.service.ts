import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _userData = new BehaviorSubject<User[]>(null);
  constructor(private http: HttpClient) {
    this.fetchUsers().subscribe((user) => {
      this._userData.next(user);
    });
  }

  getUserData() {
    return this._userData.asObservable();
  }
  setUserData(value: User[]) {
    this._userData.next(value);
  }
  deleteUser() {
    return this.http.delete('https://jsonplaceholder.typicode.com/users/1');
  }
  fetchUsers() {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
  fetchUser(index: string) {
    return this.http.get<User>(
      'https://jsonplaceholder.typicode.com/users/' + index
    );
  }
}
