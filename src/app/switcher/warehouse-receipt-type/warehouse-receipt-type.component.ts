import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DMLDataInput, EntryHttpRequest, SystemInformation } from 'src/app/shared/appModels';
import { ResourceMainStore } from 'src/app/shared/ResourceManager/resourseMainStore';
import { BottomSheetOperationsHandlerComponent } from 'src/app/shared/reusableComponents/bottom-sheet-operations-handler/bottom-sheet-operations-handler.component';
import { BackButtonService } from 'src/app/shared/services/back-button.service';
import { BottomSheetOperationsService } from 'src/app/shared/services/bottom-sheet-operations.service';
import { DmlOperationService } from 'src/app/shared/services/dml-operation.service';
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
  formOutputRefrenceHandler: { formGroup: FormGroup; barcodeFormControl: FormControl };
  operationButtonText: string;

  submitDetailsInfo: { buttonText: string; captionText: string };

  constructor(private handleSessionstorage: HandleSessionstorage,
              private resourceMainStore: ResourceMainStore,
              private bottomSheet: MatBottomSheet,
              private bottomSheetOperationsService: BottomSheetOperationsService, 
              private pwaPanelService: PWAPanelService,
              private dmlOperationService: DmlOperationService,
              private backButtonService: BackButtonService) { }

  ngOnInit(): void {

    this.initialSetup();

    this.setOperationButtonTextResource();

  }

  initialSetup() {

    // 1. getting PageInfo from SessionStorage
    this.pageInfo = this.handleSessionstorage.get("pageInfo");

    // 2. setting culture for ResourceMainStore
    this.resourceMainStore.culture = this.pageInfo.Culture;

    // 3. getting PWAPanelData
    const objectID: number = this.backButtonService.peek().ObjectID;
    this.pwaPanelService.get(objectID);

  }

  setOperationButtonTextResource() {

    this.operationButtonText = this.resourceMainStore.getOperationButtonTextResource();

  }

  formOutputHandler(event: any) {

    this.formOutputRefrenceHandler = event;

  }

  dmlFieldsGenerator(): { fieldID: number; fieldValue: string }[] {

    const _fields: { fieldID: number; fieldValue: string }[] = [];

    Object.entries(this.formOutputRefrenceHandler.formGroup.value)
          .forEach((item) => _fields.push({ fieldID: +item[0], fieldValue: item[1].toString() }));

    return _fields;

  }

  dmlEntryInputRequestGenerator(response: { status: string; objectId: number }): DMLDataInput {

    const entryInputRequest: DMLDataInput = { 
      objectID: response.objectId,
      fields: this.dmlFieldsGenerator(),
      rowID: 0,
      workgroupID: 0
    };

    return entryInputRequest;

  }

  operationsHandler(event: any) {

    if ( this.bottomSheetOperationsService.hasValue() ) {

      const bottomSheetSubscription = this.bottomSheet.open(BottomSheetOperationsHandlerComponent);

      bottomSheetSubscription
        .afterDismissed()
        .subscribe((response: { status: string; objectId: number }) => { 
          
          if ( response ) {

            const entryInputRequest: DMLDataInput = this.dmlEntryInputRequestGenerator(response);

            this.dmlOperationService.excute(entryInputRequest);

          }

        });

    }
    
  }

}
