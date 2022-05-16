import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormBuilderEventEmitterHandler, LogData, SystemInformation, TableField } from '../../appModels';
import { ResourceMainStore } from '../../ResourceManager/resourseMainStore';
import { BarcodeReaderService } from '../../services/barcode-reader.service';
import { FormFieldErrorService } from '../../services/form-field-error.service';
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
  barcodeFormControl: AbstractControl;
  formFieldsSubcrp: Subscription;
  formFieldErrorSubcrp: Subscription;

  constructor(private handleSessionstorage: HandleSessionstorage, 
              public formFieldsService: FormFieldsService,
              private formFieldErrorService: FormFieldErrorService,
              private barcodeReaderService: BarcodeReaderService,
              private resourceMainStore: ResourceMainStore) { }

  ngOnInit(): void {

    this.initialSetup();

    this.formGenerator();

    this.formFieldServerSideValidation();

  }

  initialSetup() {

    // 1. getting PageInfo from SessionStorage
    this.pageInfo = this.handleSessionstorage.get("pageInfo");

    // 2. setting culture for ResourceMainStore
    this.resourceMainStore.culture = this.pageInfo.Culture;

  }

  setFormOutputHandler(barcodeFieldId: number = 0) {

    this.barcodeFormControl = this.formBuilder.get("barcode");
    this.formOutputHandler.emit({ formGroup: this.formBuilder, barcodeFormControl: this.barcodeFormControl });

  }

  formFieldHandler(formFields: TableField[]) {

    try {
      
      formFields.map((formField: TableField) => 
                      this.formBuilder.addControl(formField.FieldID.toLocaleString(), new FormControl(formField.Value)));
  
      this.setFormOutputHandler();

    } catch (error) {}

  }

  formGenerator() {

    this.formFieldsSubcrp = this.formFieldsService.formFields$.subscribe((formFields: TableField[]) => this.formFieldHandler(formFields));

  }

  formFieldSetErrors(item: LogData) {

    this.formBuilder.get(item.FieldID.toString()).setErrors({ serverSideError : { status: true, message: item.ErrorMessage } });
    this.formBuilder.get(item.FieldID.toString()).markAsTouched();

  }

  formFieldServerSideValidation() {

    this.formFieldErrorSubcrp = this.formFieldErrorService
                                    .formFieldError$
                                    .subscribe((logDataList: LogData[]) => {

                                      logDataList?.filter((item) => item.ErrorCode !== 0).map((item) => this.formFieldSetErrors(item));

                                      this.formBuilder.updateValueAndValidity();

                                    });

  }

  assessFieldErrorStatus(formControlName:number): boolean {

    return this.formBuilder.get(formControlName.toString()).errors?.serverSideError.status;

  }

  extractFieldErrorMessage(formControlName:number): string {

    return this.formBuilder.get(formControlName.toString()).errors?.serverSideError.message; 

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

    } else if ( event.target.value.includes("\n") ) {

      alert(event.target.value)

    }

  }

  barcodeReaderManualHandler(event: any) {

    if ( event.code === "Enter" ){ 

      event.target.value = "";

      this.barcodeReaderService.read(event.target.value);

    } else if ( event.target.value.includes("\n") ) {

      alert(event.target.value)

    }

  }

  selectionChangeHandler(event: any) {}

  ngOnDestroy(): void {
    
    this.formFieldsService.reset();
    this.formFieldErrorService.reset();
    
    this.formFieldsSubcrp.unsubscribe();
    this.formFieldErrorSubcrp.unsubscribe();

  }

}
