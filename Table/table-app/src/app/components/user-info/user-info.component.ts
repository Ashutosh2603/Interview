import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  userInfoData: User;
  isLoading: boolean = true;
  constructor(
    private router: ActivatedRoute,
    private userService: UsersService
  ) {
    this.router.paramMap
      .pipe(switchMap((param) => this.userService.fetchUser(param?.get('id'))))
      .subscribe((user) => {
        this.userInfoData = user;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {}
}
