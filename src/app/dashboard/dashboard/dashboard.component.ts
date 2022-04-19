import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BackButton, SystemInformation, UserWorkgroup } from 'src/app/shared/appModels';
import { BackButtonService } from 'src/app/shared/services/back-button.service';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';
import { TaskTypeCodeHandler } from 'src/app/shared/taskTypeManager/taskTypes';
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
              private taskTypeCodeHandler: TaskTypeCodeHandler,
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

    this.pwaItemsService.getItems(lastBackBtn.ObjectID);

  }

  extractHtmlDataOperation(target: HTMLElement): Pick<BackButton, "ObjectID" | "Caption" | "TaskTypeCode" | "RouterPath"> {

    const taskTypeAttributeName: string = "taskTypeCode";
    const captionAttributeName: string = "caption";

    const result: Pick<BackButton, "ObjectID" | "Caption" | "TaskTypeCode" | "RouterPath"> = {
      ObjectID: +target.id,
      Caption: target.getAttribute(captionAttributeName),
      TaskTypeCode: +target.getAttribute(taskTypeAttributeName),
      RouterPath: location.hash.replace("#", "")
    };

    return result;

  }

  executeOperationHandler(event: any) {

    // 1. constants
    const sectionElement: HTMLElement = event.target.closest("section");
    let extractedData: Pick<BackButton, "ObjectID" | "Caption" | "TaskTypeCode" | "RouterPath"> = null;

    // 2. detecting correctTarget
    if ( sectionElement ) {
      
      // 3. extracting data for initial variables
      extractedData = this.extractHtmlDataOperation(sectionElement);
        
      // 5. manage back-button-stack
      this.backButtonService.push({ ...extractedData, Active: true });
          
      // 6. navigating to new url based on TaskTypeCode
      this.taskTypeCodeHandler.navigator(extractedData.TaskTypeCode);

      // 7. updating PWAItems
      this.pwaItemsService.reset();
      this.pwaItemsService.getItems(extractedData.ObjectID);
  
    }

  }

  ngAfterViewInit(): void {

    // clicking on the home-icon on footer programmatically
    setTimeout(() => {
      document.querySelector('[data-icon-operation="dashboard"]').closest("section").click();
    }, 500);
    
  }

}
