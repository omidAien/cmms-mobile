import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { AuthenticateParameters, AuthenticateResponse, SystemInformation, UserInfo, UserProject, UserWorkgroup, Workstation } from 'src/app/shared/appModels';
import { ISelectWorkgroupPageTextResources } from 'src/app/shared/ResourceManager/resourceModels';
import { ResourceMainStore } from 'src/app/shared/ResourceManager/resourseMainStore';
import { ApiEndPointService } from 'src/app/shared/services/api-end-point.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { GeneralErrorMessage, HandleUnauthorizeError } from 'src/app/shared/SharedClasses/errorHandlingClass';
import { ExtractSystemInfo } from 'src/app/shared/SharedClasses/extractSystemInfo';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-select-work-group',
  templateUrl: './select-work-group.component.html',
  styleUrls: ['./select-work-group.component.scss']
})
export class SelectWorkGroupComponent implements OnInit {

  systemInfo: SystemInformation | null = null;
  userInfoData: UserInfo;
  selectWorkGroupForm:FormGroup;

  workGroupList: UserWorkgroup[];
  workgroupSelected:UserWorkgroup;

  workstationSelected: Workstation;

  selectWorkGroupUIText: ISelectWorkgroupPageTextResources;

  field_autocomplete:string = "off";
  
  constructor(public extractSystemInfo: ExtractSystemInfo,
              private handleSessionstorage: HandleSessionstorage,
              public userInfoService: UserInfoService,
              private router: Router,
              private generalErrorMessage: GeneralErrorMessage,
              private handleUnauthorizeError: HandleUnauthorizeError,
              private apiEndPointService: ApiEndPointService,
              private cookieService: CookieService,
              private resourceMainStore: ResourceMainStore) { }

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

            this.resourceMainStore.culture = this.systemInfo.Culture;

            this.selectWorkGroupUIText = this.resourceMainStore.getSelectWorkgroupPageTextResources();

            this.generateSelectWorkGroupForm();

            this.workGroupList = this.handleSessionstorage.get("userWorkGroups"); 

            this.workstationSelected = this.handleSessionstorage.get("selectedWorkStation");
            
          }

        });

  }

  generateSelectWorkGroupForm() {

    this.selectWorkGroupForm = new FormGroup({
      selectWorkGroupData : new FormControl("", [Validators.required]),
    }) 
    
  }

  clickWorkGroupList(event: Event, item:UserWorkgroup) {
    this.workgroupSelected = item;
  }

  submitSelectWorkGroupForm() {

    if ( this.selectWorkGroupForm.valid ) {

      // 1. prepare authenticate parameters in order to send request to server

      const clientInformation = JSON.parse(this.cookieService.get("clientInformation"));

      const authenticateParameters: AuthenticateParameters = {
        userID : this.userInfoData.userID,
        userPSW : this.userInfoData.userPSW,
        workstationID : this.workstationSelected.PK_ObjectID,
        workgroupID : this.workgroupSelected.PK_WorkgroupID,
        clientInformation : clientInformation,
      };

      // 2. send request to server
      this.apiEndPointService
          .loginProcedure(authenticateParameters)
          .pipe(
            shareReplay(),
            catchError((error) => {
              this.handleUnauthorizeError.excuteTask(error);
              return throwError(error)
            })
          )
          .subscribe((authRes:AuthenticateResponse) => {

            if ( !authRes.Error.hasError ) {

              this.goToDashboard(authRes);

            }
            else {
              
              this.handleError(authRes);

            }

          });        
    }
    
  }

  goToDashboard(authRes: AuthenticateResponse) {

    const userDefaultProject: UserProject = authRes.Projects[0];

    const bulkData = [
      {key:"userDefaultWorkGroup", value: this.workgroupSelected},
      {key:"userProjects", value: authRes.Projects},
      {key:"userDefaultProject", value: userDefaultProject},
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
      this.generalErrorMessage.handleServerSideError(errorMsg, 'rtl');

    }
    else if ( errorMsgType === 12 ) {

      this.generalErrorMessage.handleDatabaseSideError(errorMsg);

    }

  }

}
