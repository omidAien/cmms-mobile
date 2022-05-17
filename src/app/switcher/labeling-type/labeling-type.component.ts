import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DMLDataInput, SystemInformation } from 'src/app/shared/appModels';
import { ResourceMainStore } from 'src/app/shared/ResourceManager/resourseMainStore';
import { BottomSheetOperationsHandlerComponent } from 'src/app/shared/reusableComponents/bottom-sheet-operations-handler/bottom-sheet-operations-handler.component';
import { BackButtonService } from 'src/app/shared/services/back-button.service';
import { BottomSheetOperationsService } from 'src/app/shared/services/bottom-sheet-operations.service';
import { DmlOperationService } from 'src/app/shared/services/dml-operation.service';
import { PWAPanelService } from 'src/app/shared/services/pwapanel.service';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-labeling-type',
  templateUrl: './labeling-type.component.html',
  styleUrls: ['./labeling-type.component.scss']
})
export class LabelingTypeComponent implements OnInit {

  pageInfo: Pick<SystemInformation, "Direction" | "Culture">;
  operationButtonText: string;
  formOutputRefrenceHandler: { formGroup: FormGroup; barcodeFormControl: FormControl };
  
  constructor(private handleSessionstorage: HandleSessionstorage,
              private backButtonService: BackButtonService,
              private pwaPanelService: PWAPanelService,
              private bottomSheet: MatBottomSheet,
              private resourceMainStore: ResourceMainStore,
              private dmlOperationService: DmlOperationService,
              private bottomSheetOperationsService: BottomSheetOperationsService) { }

  ngOnInit(): void {

    this.detectPageInfo();

    this.setOperationButtonTextResource();

    this.getPWAPanelData();

  }

  detectPageInfo() {

    this.pageInfo = this.handleSessionstorage.get("pageInfo");

  }

  setOperationButtonTextResource() {

    this.resourceMainStore.culture = this.pageInfo.Culture;
    this.operationButtonText = this.resourceMainStore.getOperationButtonTextResource();

  }

  getPWAPanelData() {

    const objectID: number = this.backButtonService.peek().ObjectID;

    this.pwaPanelService.get(objectID);

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
