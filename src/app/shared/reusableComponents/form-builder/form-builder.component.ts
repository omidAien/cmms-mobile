import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilderEventEmitterHandler, SystemInformation } from '../../appModels';
import { ResourceMainStore } from '../../ResourceManager/resourseMainStore';
import { HandleSessionstorage } from '../../SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  @Output() formOutputHandler = new EventEmitter<FormBuilderEventEmitterHandler>();

  formBuilder: FormGroup;
  pageInfo: Pick<SystemInformation, "Direction" | "Culture">;
  matFormFieldAppearance: string = "fill";
  formFieldErrorMsg: string;
  barcodeFormControl: AbstractControl;

  constructor(private handleSessionstorage: HandleSessionstorage, 
              private resourceMainStore: ResourceMainStore) { }

  ngOnInit(): void {

    this.detectPageInfo();

    this.setCultureForResourceMainStore();

    this.setFormFieldErrorMsg();

    this.formGenerator();

    this.formValueChangesValidator();

  }

  detectPageInfo() {

    this.pageInfo = this.handleSessionstorage.get("pageInfo");

  }

  setCultureForResourceMainStore() {

    this.resourceMainStore.culture = this.pageInfo.Culture;

  }

  setFormFieldErrorMsg() {

    this.formFieldErrorMsg = this.resourceMainStore.getFormFieldErrorMessageTextResource();

  }

  setFormOutputHandler(barcodeFieldId: number = 0) {

    this.barcodeFormControl = this.formBuilder.get("barcode");
    this.formOutputHandler.emit({ formGroup: this.formBuilder, barcodeFormControl: this.barcodeFormControl });

  }

  formGenerator() {

    this.formBuilder = new FormGroup({
      barcode: new FormControl('', Validators.required),
      warehouse: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });

    this.setFormOutputHandler();

  }

  formValueChangesValidator() {

    this.formBuilder.valueChanges.subscribe((fieldValue) => {

      if ( this.barcodeFormControl.value.length >= 12 && this.formBuilder.valid ) {

        // refactoring the barcode which has been read!

        console.log("send request to server to get detail of barcode.");

      }

    });

  }

  selectionChangeHandler(event: any) {}

}