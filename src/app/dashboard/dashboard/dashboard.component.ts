import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemInformation, UserWorkgroup } from 'src/app/shared/appModels';
import { ExtractSystemInfo } from 'src/app/shared/SharedClasses/extractSystemInfo';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  systemInfo: SystemInformation | null = null;
  userFullname:string = "UnKnown";
  userPosition:string = "UnKnown";

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

}
