import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  usersData: User[];
  userDataState: User[] = [];
  columns = ['Name', 'Email', 'Company'];
  sortingOrder: boolean = true;
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userService.getUserData().subscribe((data) => {
      console.log(data);
      this.usersData = data;
      this.userDataState = data;
    });
  }
  onEdit(index: number, event: Event) {
    event.stopPropagation();
    this.router.navigate(['user', index, 'edit'], {
      state: this.usersData[index - 1],
    });
  }
  onDelete(index: number, event: Event) {
    event.stopPropagation();
    this.userService.deleteUser().subscribe((d) => {
      console.log(d);
      this.userService.fetchUsers().subscribe((d) => console.log(d));
    });

    // this.usersData = [
    //   ...this.userDataState.filter((user) => user.id !== index),
    // ];
    // this.userService.setUserData(this.usersData);
  }
  onRowClick(user: User, event: Event) {
    event.stopPropagation();
    let id = +user['id'];
    this.router.navigate(['user', id]);
  }

  onInputChange(event) {
    console.log(event);
    this.usersData = [
      ...this.userDataState.filter((user) => {
        return (
          user.name.toLocaleLowerCase().includes(event) ||
          user.email.toLocaleLowerCase().includes(event) ||
          user.company.name.toLocaleLowerCase().includes(event)
        );
      }),
    ];
  }

  onCreate() {
    this.router.navigate(['user', 'create']);
  }

  sort(col: string) {
    let column = col.toLocaleLowerCase();
    if (this.sortingOrder) {
      this.usersData.sort((a, b) => {
        return col == this.columns[2]
          ? a[column]['name'] < b[column]['name']
            ? 1
            : a[column]['name'] > b[column]['name']
            ? -1
            : 0
          : a[column] < b[column]
          ? 1
          : a[column] > b[column]
          ? -1
          : 0;
      });
    } else {
      this.usersData.sort((a, b) => {
        return col == this.columns[2]
          ? a[column]['name'] > b[column]['name']
            ? 1
            : a[column]['name'] < b[column]['name']
            ? -1
            : 0
          : a[column] > b[column]
          ? 1
          : a[column] < b[column]
          ? -1
          : 0;
      });
    }
    this.sortingOrder = !this.sortingOrder;
    console.log(this.usersData);
  }
}
