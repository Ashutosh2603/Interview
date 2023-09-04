import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserTableComponent,
  },
  {
    path: 'user/create',
    component: AddUserComponent,
  },
  {
    path: 'user/:id',
    component: UserInfoComponent,
    pathMatch: 'full',
  },
  {
    path: 'user/:id/edit',
    component: AddUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
