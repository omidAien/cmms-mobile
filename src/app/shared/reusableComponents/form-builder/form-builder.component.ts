import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormBuilderEventEmitterHandler, SystemInformation, TableField } from '../../appModels';
import { ResourceMainStore } from '../../ResourceManager/resourseMainStore';
import { BarcodeReaderService } from '../../services/barcode-reader.service';
import { FormFieldsService } from '../../services/form-fields.service';
import { HandleSessionstorage } from '../../SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy {

  @Output() formOutputHandler = new EventEmitter<FormBuilderEventEmitterHandler>();

  formBuilder: FormGroup = new FormGroup({});
  pageInfo: Pick<SystemInformation, "Direction" | "Culture">;
  formFieldErrorMsg: string;
  barcodeFormControl: AbstractControl;
  formFieldsSubcrp: Subscription;

  constructor(private handleSessionstorage: HandleSessionstorage, 
              public formFieldsService: FormFieldsService,
              private barcodeReaderService: BarcodeReaderService,
              private resourceMainStore: ResourceMainStore) { }

  ngOnInit(): void {

    this.detectPageInfo();

    this.setCultureForResourceMainStore();

    this.setFormFieldErrorMsg();

    this.formGenerator();

    // this.formValueChangesValidator();

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

  formFieldHandler(formFields: TableField[]) {

    try {
      
      formFields
        .filter((formField: TableField) => formField.isVisible)
        .map((formField: TableField) => this.formBuilder.addControl(formField.FieldID.toLocaleString(), new FormControl(formField.Value)));
  
      this.setFormOutputHandler();

    } catch (error) {}

  }

  formGenerator() {

    this.formFieldsSubcrp = this.formFieldsService.formFields$.subscribe((formFields: TableField[]) => this.formFieldHandler(formFields));

  }

  formValueChangesValidator() {

    this.formBuilder.valueChanges.subscribe((fieldValue) => {

      if ( this.barcodeFormControl.value.length >= 12 && this.formBuilder.valid ) {

        // refactoring the barcode which has been read!

        console.log("sending request toward the server in order to get detail of barcode.");

      }

    });

  }

  barcodeReaderAutoHandler(event: any) {

    if ( event.target.value.indexOf(" ") > 0 ) {

      this.barcodeReaderService.read(event.target.value.trim());

      event.target.blur();

      event.target.value = "";

    }

  }

  barcodeReaderManualHandler(event: any) {

    if ( event.code === "Enter" ){ 

      event.target.value = "";

      this.barcodeReaderService.read(event.target.value);

    }

  }

  selectionChangeHandler(event: any) {}

  ngOnDestroy(): void {
    
    this.formFieldsService.reset();
    this.formFieldsSubcrp.unsubscribe();

  }

}
