import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SystemInformation } from 'src/app/shared/appModels';
import { ApiEndPointService } from 'src/app/shared/services/api-end-point.service';
import { ExtractSystemInfo } from 'src/app/shared/SharedClasses/extractSystemInfo';

@Component({
  selector: 'map-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pageDirection:string;
  Caption:string;
  appVersion:string;
  PoweredBy:string;
  ReleaseDate:string;
  logoImage:string;
  wallpaper:string;

  loginForm:FormGroup;

  usernameLabel:string = "نام کاربری";
  passwordLabel:string = "کلمه عبور";
  field_autocomplete:string = "off";
  field_autofocus:boolean = false;
  logInBtnText:string = "ورود به حساب کاربری";
  remmeberMeCheckBoxText:string = "مرا در این رایانه به خاطر نگه‌دار";
  retrievePasswordLinkText:string = "بازیابی کلمه عبور";
  hasAccountSpanText:string = "حساب کاربری ندارید؟";
  createNewAccount:string = "ایجاد حساب کاربری جدید";

  hidePassword:boolean = true;
  remmeberMeIsChecked:boolean = false;

  rememberMeCheckBoxExistInLocalStorage:boolean = false;

  constructor(private apiEndPointService: ApiEndPointService,
              private extractSystemInfo: ExtractSystemInfo) {}

  ngOnInit() {

    try {

      // 1. checking systemInformation
      const systemInformation: SystemInformation = this.extractSystemInfo.getInfo();

      if ( systemInformation ) {

        // 2. get systemInformation from server
        this.pageDirection = systemInformation.Direction;
        this.Caption = systemInformation.Caption;
        this.appVersion = systemInformation.Version;
        this.PoweredBy = systemInformation.PoweredBy;
        this.ReleaseDate = systemInformation.ReleaseDate;
        this.logoImage = systemInformation.Logo;
        this.wallpaper = systemInformation.Wallpaper;
  
        // 3. create LoginForm
        this.loginForm = new FormGroup({
          username: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required]),
        });

      }
      
    } catch (error) {

      console.log("Redirect to Page-404 ....");
      
    }

  }

  onSubmitForm() {

  }

  onRetrievePassword() {

  }

  onCreateNewAccount() {

  }

}
