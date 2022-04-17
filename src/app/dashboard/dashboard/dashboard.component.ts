import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackButton, PWAItems, SystemInformation, UserWorkgroup } from 'src/app/shared/appModels';
import { BackButtonService } from 'src/app/shared/services/back-button.service';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';
import { PWAItemsService } from '../Services/pwaitems.service';

@Component({
  selector: 'map-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  pageInfo: Pick<SystemInformation, "Direction" | "Culture">;
  userFullname:string = "UnKnown";
  userPosition:string = "UnKnown";

  constructor(private handleSessionstorage: HandleSessionstorage,
              public pwaItemsService: PWAItemsService,
              private backButtonService: BackButtonService) { }

  ngOnInit(): void {
    
    this.initialInfoHandler();

    this.PWAItemsHandler();

  }

  initialInfoHandler() {

    // 1. getting pageInfo, <Direction" | "Culture>
    this.pageInfo = this.handleSessionstorage.get("pageInfo");

    // 2. getting user Information, <userFullname | userPosition>
    this.userFullname = this.handleSessionstorage.get("userFullName");
    const userDefaultWorkGroup: UserWorkgroup = this.handleSessionstorage.get("userDefaultWorkGroup");
    this.userPosition = userDefaultWorkGroup.Workgroup;

  }

  PWAItemsHandler() {

    /* this function will be called in two places. 
    First, when user has been moved to dashboard-page first of all, second, when user refresh the page */

    const lastBackBtn: BackButton = this.backButtonService.peek();

    this.pwaItemsService.getItems(lastBackBtn.ObjectID, this.pageInfo.Direction);

  }

  executeOperationHandler(event: any) {

    // 1. constants
    const taskTypeAttributeName: string = "taskTypeCode";
    const captionAttributeName: string = "caption";
    const _target: HTMLElement = event.target;

    // 2. initial variables
    let correctTarget: HTMLElement;
    let extractedObjectID: number = 0;
    let extractedCaption: string;
    let extractedTaskTypeCode: number = 0;
    let extractedRouterPath: string;

    // 3. detecting correctTarget
    if ( _target.closest("section") ) {

      correctTarget = _target.closest("section");

    }

    // 4. extracting value for initial variables
    extractedObjectID = +correctTarget.id;
    extractedTaskTypeCode = +correctTarget.getAttribute(taskTypeAttributeName);
    extractedCaption = correctTarget.getAttribute(captionAttributeName);
    extractedRouterPath = location.hash.replace("#", "");

    // 5. manage back-button-stack
    this.backButtonService.push({
      ObjectID: extractedObjectID,
      TaskTypeCode: extractedTaskTypeCode,
      Caption: extractedCaption,
      RouterPath: extractedRouterPath,
      Active: true  
    });

    // 6. updating PWAItems
    this.pwaItemsService.reset();
    this.pwaItemsService.getItems(extractedObjectID, this.pageInfo.Direction);

  }

  ngAfterViewInit(): void {

    // clicking on the home-icon on footer programmatically
    setTimeout(() => {
      document.querySelector('[data-icon-operation="dashboard"]').closest("section").click();
    }, 500);
    
  }

}
