import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  editData: any;
  userData: User[];
  userForm: FormGroup;
  mode: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {
    this.editData = this.router.getCurrentNavigation().extras.state;
    this.mode =
      Object.keys(this.route.snapshot.params).length > 0 ? 'edit' : 'create';
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe((data) => {
      this.userData = data;
    });
    this.setUserFormData();
  }

  setUserFormData() {
    if (this.mode == 'create') {
      this.userForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        company: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.required]),
      });
    } else {
      this.userForm = new FormGroup({
        name: new FormControl(this.editData.name, Validators.required),
        email: new FormControl(this.editData.email, Validators.required),
        company: new FormControl(
          this.editData.company.name,
          Validators.required
        ),
        address: new FormControl(
          this.editData.address.street,
          Validators.required
        ),
        phone: new FormControl(this.editData.phone, [Validators.required]),
      });
    }
  }

  onSubmit(e: FormGroup) {
    let user: User = {
      id: this.userData.length + 1,
      address: { street: '', suite: '' },
      name: '',
      phone: '',
      email: '',
      company: {
        name: '',
      },
    };
    if (this.mode == 'create') {
      user['name'] = e.get('name').value;
      user['email'] = e.get('email').value;
      user['company']['name'] = e.get('company').value;
      user['address']['street'] = e.get('address').value;
      user['phone'] = e.get('phone').value;
      console.log(user);
      this.userData.push(user);
      this.userService.setUserData(this.userData);
    } else if (this.mode == 'edit') {
      this.userData.map((user) => {
        if (user['id'] == this.editData['id']) {
          user['name'] = e.get('name').value;
          user['email'] = e.get('email').value;
          user['company']['name'] = e.get('company').value;
          user['address']['street'] = e.get('address').value;
          user['phone'] = e.get('phone').value;
        }
      });
      this.userService.setUserData(this.userData);
      console.log(this.userData);
    }
    this.router.navigate(['']);
  }
}
