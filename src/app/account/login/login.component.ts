import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SystemInformation } from 'src/app/shared/appModels';
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
  systemInfo: SystemInformation
  loginForm:FormGroup;
  field_autocomplete:string = "off";
  field_autofocus:boolean = false;

  hidePassword:boolean = true;
  remmeberMeIsChecked:boolean = true;
  rememberMeCheckBoxExistInLocalStorage:boolean = true;

  constructor(private apiEndPointService: ApiEndPointService,
              private extractSystemInfo: ExtractSystemInfo) {}

  ngOnInit() {

    try {

      // 1. checking systemInformation
      const _systemInformation: SystemInformation = this.extractSystemInfo.getInfo();

      if ( _systemInformation ) {

        // 2. get systemInformation from server
        this.systemInfo = _systemInformation;

        // 3. set LogInPageUIText
        this.logInPageUIText = getLogInPageUIText(this.systemInfo.Culture);
  
        // 4. generate LoginForm
        this.generateLoginForm();

      }
      
    } catch (error) {

      console.log("Redirect to Page-404 ....");
      
    }

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
