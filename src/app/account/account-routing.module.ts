import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { SelectWorkGroupComponent } from './select-work-group/select-work-group.component';
import { SelectWorkstationComponent } from './select-workstation/select-workstation.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "forget-password",
    component: ForgetPasswordComponent
  },
  {
    path: "select-work-group",
    component: SelectWorkGroupComponent
  },
  {
    path: "select-workstation",
    component: SelectWorkstationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
