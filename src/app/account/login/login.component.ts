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

  systemInfo: SystemInformation | null = null;
  logInPageUIText: LoginPageUIText;
  loginForm:FormGroup;
  field_autocomplete:string = "off";
  field_autofocus:boolean = false;

  hidePassword:boolean = true;
  remmeberMeIsChecked:boolean = true;
  rememberMeCheckBoxExistInLocalStorage:boolean = true;

  constructor(private apiEndPointService: ApiEndPointService,
              private extractSystemInfo: ExtractSystemInfo) {}

  ngOnInit() {

    this.extractSystemInfo
        .systemInfo$
        .subscribe((_systemInfo: SystemInformation | null) => {

          if ( _systemInfo ) {

            this.systemInfo = _systemInfo;

            this.logInPageUIText = getLogInPageUIText(_systemInfo.Culture);
          
            this.generateLoginForm();

          }

        });

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
