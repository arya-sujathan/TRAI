import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'userlist', component: UserListComponent }, 
  { path: 'adduser', component: AddUserComponent }, 
  { path: 'logout', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


