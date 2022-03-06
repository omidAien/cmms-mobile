import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket, faGear, faHouse, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { SystemInformation, UserWorkgroup } from 'src/app/shared/appModels';
import { ExtractSystemInfo } from 'src/app/shared/SharedClasses/extractSystemInfo';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  systemInfo: SystemInformation | null = null;
  userFullname:string = "UnKnown";
  userPosition:string = "UnKnown";

  faArrowRightFromBracketIcon: IconDefinition = faArrowRightFromBracket;
  faGearIcon: IconDefinition = faGear;
  faHouseIcon: IconDefinition = faHouse;

  constructor(private handleSessionstorage: HandleSessionstorage,
              private extractSytemInfo: ExtractSystemInfo) { }

  ngOnInit(): void {

    const systemInfo$:Observable<SystemInformation> = this.extractSytemInfo.systemInfo$;
    
    systemInfo$.subscribe((_systemInfo: SystemInformation) => {

      if ( _systemInfo ) {

        this.systemInfo = _systemInfo;
        this.userFullname = this.handleSessionstorage.get("userFullName");

        const userDefaultWorkGroup: UserWorkgroup = this.handleSessionstorage.get("userDefaultWorkGroup");
        this.userPosition = userDefaultWorkGroup.Workgroup;

      }

    });

  }

  iconClick(event:any, iconOperation:string): void {

    const eventTarget = event.target;

    // 1. rest 
    const footerElement = eventTarget.closest("footer") as HTMLElement;
    const allIcons = footerElement.querySelectorAll("fa-icon");
    allIcons.forEach((faIcon) => faIcon.classList.remove("fa-icon-active"));

    // 2. imply
    const faIconElement: HTMLElement = eventTarget.closest("fa-icon") ? eventTarget.closest("fa-icon") : eventTarget.querySelector("fa-icon");
    const iconOperationExtracted:string = faIconElement.dataset.iconOperation;

    if ( iconOperationExtracted === iconOperation ) {

      faIconElement.classList.add("fa-icon-active");

    }
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      document.querySelector('[data-icon-operation="dashboard"]').closest("section").click();
    }, 500);
    
  }

}
