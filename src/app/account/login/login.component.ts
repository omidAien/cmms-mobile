import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { AuthenticateParameters, AuthenticateResponse, SystemInformation, UserProject, UserWorkgroup, Workstation } from 'src/app/shared/appModels';
import { ILoginPageTextResources } from 'src/app/shared/ResourceManager/resourceModels';
import { ResourceMainStore } from 'src/app/shared/ResourceManager/resourseMainStore';
import { ApiEndPointService } from 'src/app/shared/services/api-end-point.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { GeneralErrorMessage, HandleUnauthorizeError } from 'src/app/shared/SharedClasses/errorHandlingClass';
import { ExtractSystemInfo } from 'src/app/shared/SharedClasses/extractSystemInfo';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  systemInfo: SystemInformation | null = null;
  logInPageUIText: ILoginPageTextResources;
  loginForm:FormGroup;
  field_autocomplete:string = "off";
  field_autofocus:boolean = false;

  hidePassword:boolean = true;
  remmeberMeIsChecked:boolean = true;
  rememberMeCheckBoxExistInLocalStorage:boolean = true;

  constructor(private apiEndPointService: ApiEndPointService,
              private extractSystemInfo: ExtractSystemInfo,
              private cookieService: CookieService,
              private router: Router,
              private handleSessionstorage: HandleSessionstorage,
              private generalErrorMessage: GeneralErrorMessage,
              private userInfoService: UserInfoService,
              private handleUnauthorizeError: HandleUnauthorizeError,
              private resourceMainStore: ResourceMainStore) {}

  ngOnInit() {

    this.handleSessionstorage.reset();

    this.extractSystemInfo
        .systemInfo$
        .subscribe((_systemInfo: SystemInformation | null) => {

          if ( _systemInfo ) {

            this.systemInfo = _systemInfo;

            this.resourceMainStore.culture = this.systemInfo.Culture;

            this.logInPageUIText = this.resourceMainStore.getLoginPageTextResources();
          
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

    if ( this.loginForm.valid ) {

      // 1. prepare authenticate parameters in order to send request to server

      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      const clientInformation = JSON.parse(this.cookieService.get("clientInformation"));
  
      const authenticateParameters: AuthenticateParameters = {
        userID : username,
        userPSW : password,
        workstationID : 0,
        workgroupID : 0,
        clientInformation : clientInformation,
      };

      this.apiEndPointService
          .loginProcedure(authenticateParameters)
          .pipe(
              shareReplay(),
              catchError((error: HttpErrorResponse) => {
                this.handleUnauthorizeError.excuteTask(error);
                return throwError(error);
              })
            )
          .subscribe((authRes:AuthenticateResponse) => { 

            if ( !authRes.Error.hasError ) {

              // save userInfo
              this.userInfoService.set({ userID: username, userPSW: password });

              // save fullname of user in sessionStorage
              this.handleSessionstorage.set("userFullName", authRes.UserName);

              // if user has more than one workstation
              if ( !authRes.Token && authRes.Workstations.length > 1 ) {

                this.handleWorkStation(authRes);

              }

              // else-if user has only one workstation and the DefaultWorkgroupID is equal zero
              else if ( !authRes.Token && authRes.Workstations.length === 1 && authRes.DefaultWorkgroupID === 0 ) {

                this.handleWorkGroup(authRes);

              }
              else {

                this.goToDashboard(authRes);

              }

            }  
            
            else {
              this.handleError(authRes);
            }
          });
      }
      
  }

  handleWorkStation(authRes:AuthenticateResponse) {

    this.handleSessionstorage.set("userWorkstations", authRes.Workstations);
    this.router.navigateByUrl("/account/select-workstation");

  }

  handleWorkGroup(authRes:AuthenticateResponse) {

    const selectedWorkStation: Workstation = authRes.Workstations[0];

    const bulkData = [
      {key:"selectedWorkStation", value:selectedWorkStation},
      {key:"userWorkGroups", value:authRes.Workgroups}
    ];

    bulkData.map((item) => this.handleSessionstorage.set(item.key, item.value));

    this.router.navigateByUrl("/account/select-work-group");

  }

  goToDashboard(authRes:AuthenticateResponse) {

    const userDefWG:UserWorkgroup = authRes.Workgroups.filter((wk: UserWorkgroup) => wk.PK_WorkgroupID === authRes.DefaultWorkgroupID)[0];
    const userDefaultProject:UserProject = authRes.Projects[0];

    const bulkData = [
      {key:"userWorkGroups", value:authRes.Workgroups},
      {key:"userProjects", value:authRes.Projects},
      {key:"userDefaultWorkGroup", value:userDefWG},
      {key:"userDefaultProject", value:userDefaultProject},
      {key:"userIsLogin", value:true}
    ];

    bulkData.map((item) => this.handleSessionstorage.set(item.key, item.value));
    this.cookieService.set("token", JSON.stringify(authRes.Token));

    this.router.navigateByUrl('/dashboard');

  }

  handleError(authRes:AuthenticateResponse) {

    const errorMsg:string = authRes.Error.Message;
    const errorMsgType:number = authRes.Error.MessageViewType;

    if ( errorMsgType === 13 ) {

      this.generalErrorMessage.duration = 5000;
      this.generalErrorMessage.handleServerSideError(errorMsg, this.systemInfo.Direction);

    }
    else if ( errorMsgType === 12 ) {

      this.generalErrorMessage.handleDatabaseSideError(errorMsg);

    }

  }

  onRetrievePassword() {

  }

  onCreateNewAccount() {

  }

}
