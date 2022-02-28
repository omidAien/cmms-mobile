import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SelectWorkGroupComponent } from './select-work-group/select-work-group.component';
import { SelectWorkstationComponent } from './select-workstation/select-workstation.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    SelectWorkGroupComponent,
    SelectWorkstationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
