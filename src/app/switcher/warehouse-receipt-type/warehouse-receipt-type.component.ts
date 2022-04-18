import { Component, OnInit } from '@angular/core';
import { EntryHttpRequest, FormBuilderEventEmitterHandler, SystemInformation } from 'src/app/shared/appModels';
import { ResourceMainStore } from 'src/app/shared/ResourceManager/resourseMainStore';
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
  formBuilderEventHandler: FormBuilderEventEmitterHandler;

  constructor(private handleSessionstorage: HandleSessionstorage,
              private resourceMainStore: ResourceMainStore,
              private generalErrorMessage: GeneralErrorMessage) { }

  ngOnInit(): void {

    this.detectPageInfo();

    this.setCultureForResourceMainStore();

  }

  detectPageInfo() {

    this.pageInfo = this.handleSessionstorage.get("pageInfo");

  }

  setCultureForResourceMainStore() {

    this.resourceMainStore.culture = this.pageInfo.Culture;

  }

  formOutputHandler(event: FormBuilderEventEmitterHandler) {

    this.formBuilderEventHandler = event;

  }

  submit(event: any) {

    if ( this.formBuilderEventHandler.barcodeFormControl.value.length < 12 ) {

      const errorMsg: string = this.resourceMainStore.getInvalidBarcodeLengthErrorMessageTextResource();
      this.generalErrorMessage.handleClientSideError(errorMsg, this.pageInfo.Direction);

    } else if ( this.formBuilderEventHandler.formGroup.invalid ) {

      this.formBuilderEventHandler.formGroup.markAllAsTouched();

    } else {
      
      console.log(this.formBuilderEventHandler.formGroup.value);
    
    }

  }

}
