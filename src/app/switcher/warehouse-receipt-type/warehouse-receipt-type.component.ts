import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EntryHttpRequest, SystemInformation } from 'src/app/shared/appModels';
import { ResourceMainStore } from 'src/app/shared/ResourceManager/resourseMainStore';
import { BottomSheetOperationsHandlerComponent } from 'src/app/shared/reusableComponents/bottom-sheet-operations-handler/bottom-sheet-operations-handler.component';
import { BackButtonService } from 'src/app/shared/services/back-button.service';
import { PWAPanelService } from 'src/app/shared/services/pwapanel.service';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-warehouse-receipt-type',
  templateUrl: './warehouse-receipt-type.component.html',
  styleUrls: ['./warehouse-receipt-type.component.scss']
})
export class WarehouseReceiptTypeComponent implements OnInit {

  pageInfo: Pick<SystemInformation, "Direction" | "Culture">;
  entryHttpRequest: EntryHttpRequest = {};
  documentInfoViewerForm: FormGroup;
  submitChangesButtonText: string;

  submitDetailsInfo: { buttonText: string; captionText: string };

  constructor(private handleSessionstorage: HandleSessionstorage,
              private resourceMainStore: ResourceMainStore,
              private bottomSheet: MatBottomSheet, 
              private pwaPanelService: PWAPanelService,
              private backButtonService: BackButtonService) { }

  ngOnInit(): void {

    this.detectPageInfo();

    this.setCultureForResourceMainStore();

    // this.setSubmitDetailsInfo();

    this.setSubmitChangesButtonTextResource();

    this.getPWAPanelData();

  }

  detectPageInfo() {

    this.pageInfo = this.handleSessionstorage.get("pageInfo");

  }

  setCultureForResourceMainStore() {

    this.resourceMainStore.culture = this.pageInfo.Culture;

  }

  getPWAPanelData() {

    const objectID: number = this.backButtonService.peek().ObjectID;

    this.pwaPanelService.get(objectID);

  }

  setSubmitDetailsInfo() {

    this.submitDetailsInfo = {
      buttonText: this.resourceMainStore.getSubmitDetailsButtonTextResource(),
      captionText: this.resourceMainStore.getSubmitDetailsHeaderCaptionTextResource()
    };

  }

  setSubmitChangesButtonTextResource() {

    this.submitChangesButtonText = this.resourceMainStore.getChangeApplyButtonTextResource();

  }

  documentInfoViewerFormHandler(event: FormGroup) {

    this.documentInfoViewerForm = event;

  }

  operationsHandler(event: any) {

    this.bottomSheet.open(BottomSheetOperationsHandlerComponent);

  }

}
