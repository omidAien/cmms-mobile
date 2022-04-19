import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { AuthenticateParameters, AuthenticateResponse, SystemInformation, UserInfo, UserProject, UserWorkgroup, Workstation } from 'src/app/shared/appModels';
import { ApiEndPointService } from 'src/app/shared/services/api-end-point.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { GeneralErrorMessage, HandleUnauthorizeError } from 'src/app/shared/SharedClasses/errorHandlingClass';
import { ExtractSystemInfo } from 'src/app/shared/SharedClasses/extractSystemInfo';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-select-workstation',
  templateUrl: './select-workstation.component.html',
  styleUrls: ['./select-workstation.component.scss']
})
export class SelectWorkstationComponent implements OnInit {

  systemInfo: SystemInformation | null = null;
  workstations: Workstation[];
  userInfoData: UserInfo;

  constructor(public extractSystemInfo: ExtractSystemInfo,
              private handleSessionstorage: HandleSessionstorage,
              public userInfoService: UserInfoService,
              private router: Router,
              private generalErrorMessage: GeneralErrorMessage,
              private handleUnauthorizeError: HandleUnauthorizeError,
              private apiEndPointService: ApiEndPointService,
              private cookieService: CookieService) { }

  ngOnInit(): void {

    this.userInfoData = this.userInfoService.get();

    if ( !this.userInfoData ) {

      this.router.navigateByUrl("/account/login");
      return;

    }
        
    this.extractSystemInfo
        .systemInfo$
        .subscribe((_systemInfo: SystemInformation | null) => {

          if ( _systemInfo ) {

            this.systemInfo = _systemInfo;
            this.workstations = this.handleSessionstorage.get('userWorkstations');
            
          }

        });
    
  }

  selectWorkstation(workstation: Workstation) {

    const selectedWorkstaion: Workstation = workstation;
    const selectedWorkstaionId: number = workstation.PK_ObjectID;
    const clientInformation = JSON.parse(this.cookieService.get("clientInformation"));

    const authenticateParameters: AuthenticateParameters = {
      userID : this.userInfoData.userID,
      userPSW : this.userInfoData.userPSW,
      workstationID : selectedWorkstaionId,
      workgroupID : 0,
      clientInformation : clientInformation,
    };

    // send request to server
    this.apiEndPointService
        .loginProcedure(authenticateParameters)
        .pipe(
          shareReplay(),
          catchError((error) => {
            this.handleUnauthorizeError.excuteTask(error);
            return throwError(error);
          })
        )
        .subscribe((authRes:AuthenticateResponse) => {

          if ( !authRes.Error.hasError ) {

            // save userWorkgroups in sessionStorage
            this.handleSessionstorage.set("userWorkGroups", authRes.Workgroups);

            if ( !authRes.Token && !authRes.Projects ) {

              this.handleWorkGroup(selectedWorkstaion);

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

  handleWorkGroup(selectedWorkstaion: Workstation) {

    this.handleSessionstorage.set("selectedWorkStation", selectedWorkstaion);
    this.router.navigateByUrl("/account/select-work-group");

  }

  goToDashboard(authRes:AuthenticateResponse) {

    const userDefWG: UserWorkgroup = authRes.Workgroups.filter((item: UserWorkgroup) => item.PK_WorkgroupID === authRes.DefaultWorkgroupID)[0];
    const userDefaultProject: UserProject = authRes.Projects[0];

    const bulkData = [
      {key:"userDefaultWorkGroup", value:userDefWG},
      {key:"userProjects", value:authRes.Projects},
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

      this.generalErrorMessage.horizontalPosition = "center";
      this.generalErrorMessage.verticalPosition = "top";
      this.generalErrorMessage.duration = 5000;
      this.generalErrorMessage.handleServerSideError(errorMsg);

    }
    else if ( errorMsgType === 12 ) {

      this.generalErrorMessage.handleDatabaseSideError(errorMsg);

    }

  }

}
