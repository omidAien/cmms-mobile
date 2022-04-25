import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { BackButton, EntryHttpRequest, SystemInformation } from 'src/app/shared/appModels';
import { ResourceMainStore } from 'src/app/shared/ResourceManager/resourseMainStore';
import { BottomSheetOperationsHandlerComponent } from 'src/app/shared/reusableComponents/bottom-sheet-operations-handler/bottom-sheet-operations-handler.component';
import { BackButtonService } from 'src/app/shared/services/back-button.service';
import { GeneralErrorMessage } from 'src/app/shared/SharedClasses/errorHandlingClass';
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
              private router: Router,
              private bottomSheet: MatBottomSheet, 
              private backButtonService: BackButtonService,
              private generalErrorMessage: GeneralErrorMessage) { }

  ngOnInit(): void {

    this.detectPageInfo();

    this.setCultureForResourceMainStore();

    this.setSubmitDetailsInfo();

    this.setSubmitChangesButtonTextResource();

  }

  detectPageInfo() {

    this.pageInfo = this.handleSessionstorage.get("pageInfo");

  }

  setCultureForResourceMainStore() {

    this.resourceMainStore.culture = this.pageInfo.Culture;

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

  submitDetailsHandler(event: any) {

    this.router.navigateByUrl(`${this.router.url}/detail-form`);

    const backBtn: BackButton = {
      ObjectID: 0,
      Caption: this.submitDetailsInfo.captionText,
      TaskTypeCode: 0,
      RouterPath: this.router.url,
      Active: true
    };

    this.backButtonService.push(backBtn);

  }

  showDetailsHandler(event: any) {

    this.router.navigateByUrl(`${this.router.url}/detail-viewer`);

  }

  operationsHandler(event: any) {

    this.bottomSheet.open(BottomSheetOperationsHandlerComponent);

  }

}
