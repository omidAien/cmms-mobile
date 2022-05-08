import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SystemInformation } from 'src/app/shared/appModels';
import { BackButtonService } from 'src/app/shared/services/back-button.service';
import { PWAPanelService } from 'src/app/shared/services/pwapanel.service';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-labeling-type',
  templateUrl: './labeling-type.component.html',
  styleUrls: ['./labeling-type.component.scss']
})
export class LabelingTypeComponent implements OnInit {

  pageInfo: Pick<SystemInformation, "Direction" | "Culture">;
  documentInfoViewerForm: FormGroup;
  
  constructor(private handleSessionstorage: HandleSessionstorage,
              private backButtonService: BackButtonService,
              private pwaPanelService: PWAPanelService) { }

  ngOnInit(): void {

    this.detectPageInfo();

    this.getPWAPanelData();

  }

  detectPageInfo() {

    this.pageInfo = this.handleSessionstorage.get("pageInfo");

  }

  getPWAPanelData() {

    const objectID: number = this.backButtonService.peek().ObjectID;

    // this.pwaPanelService.get(objectID);

  }

  documentInfoViewerFormHandler(event: FormGroup) {

    this.documentInfoViewerForm = event;

  }

}
