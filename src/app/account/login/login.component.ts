import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiEndPointService } from 'src/app/shared/services/api-end-point.service';
import { ExtractSystemInfo } from 'src/app/shared/SharedClasses/extractSystemInfo';
import { LoginPageUIText } from 'src/assets/Resources/projectInterfaceResources';
import { getLogInPageUIText } from 'src/assets/Resources/projectResources';

@Component({
  selector: 'map-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInPageUIText: LoginPageUIText;
  loginForm:FormGroup;
  field_autocomplete:string = "off";
  field_autofocus:boolean = false;

  hidePassword:boolean = true;
  remmeberMeIsChecked:boolean = true;
  rememberMeCheckBoxExistInLocalStorage:boolean = true;

  constructor(private apiEndPointService: ApiEndPointService,
              public extractSystemInfo: ExtractSystemInfo) {}

  ngOnInit() {

    // 3. set LogInPageUIText
    this.logInPageUIText = getLogInPageUIText("fa");
  
    // 4. generate LoginForm
    this.generateLoginForm();


  }

  generateLoginForm() {

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

  }

  onSubmitForm() {

  }

  onRetrievePassword() {

  }

  onCreateNewAccount() {

  }

}
