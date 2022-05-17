import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilderEventEmitterHandler, SystemInformation } from 'src/app/shared/appModels';
import { ResourceMainStore } from 'src/app/shared/ResourceManager/resourseMainStore';
import { HandleSessionstorage } from 'src/app/shared/SharedClasses/HandleSessionStorage';
import { BackButtonService } from '../../services/back-button.service';
import { PWAPanelService } from '../../services/pwapanel.service';

@Component({
  selector: 'map-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnInit {

  pageInfo: Pick<SystemInformation, "Direction" | "Culture">;
  operationButtonText: string;
  formBuilderHandler: FormGroup;

  constructor(private handleSessionstorage: HandleSessionstorage,
              private backButtonService: BackButtonService,
              private pwaPanelService: PWAPanelService,
              private resourceMainStore: ResourceMainStore) { }

  ngOnInit(): void {

    this.detectPageInfo();

    this.setCultureForResourceMainStore();

    this.setOperationButtonTextResource();

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

  setOperationButtonTextResource() {

    this.operationButtonText = this.resourceMainStore.getOperationButtonTextResource();

  }

  formBuilderOutputHandler(event: FormBuilderEventEmitterHandler) {

    this.formBuilderHandler = event.formGroup;

  }

  submitChages(event: any) {

        // if ( this.formBuilderEventHandler.barcodeFormControl.value.length < 12 ) {

    //   const errorMsg: string = this.resourceMainStore.getInvalidBarcodeLengthErrorMessageTextResource();
    //   this.generalErrorMessage.handleClientSideError(errorMsg, this.pageInfo.Direction);

    // } else if ( this.formBuilderEventHandler.formGroup.invalid ) {

    //   this.formBuilderEventHandler.formGroup.markAllAsTouched();

    // } else {
      
    //   console.log(this.formBuilderEventHandler.formGroup.value);
    
    // }

    if ( this.formBuilderHandler.invalid ) {

      this.formBuilderHandler.markAllAsTouched();

    } else {
      
      console.log(this.formBuilderHandler.value);

      this.formBuilderHandler.reset();
    
    }

  }

}
