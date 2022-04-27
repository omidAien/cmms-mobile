import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { GetInitialDataService } from './services/get-initial-data.service';
import { ClientInformationService } from './services/client-information.service';
import { GeneralErrorMessage, GeneralSuccssMessage, HandleUnauthorizeError } from './SharedClasses/errorHandlingClass';
import { HandleSessionstorage } from './SharedClasses/HandleSessionStorage';
import { FooterComponent } from './reusableComponents/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayPreloaderComponent } from './reusableComponents/overlay-preloader/overlay-preloader.component';
import { ResourceMainStore } from './ResourceManager/resourseMainStore';
import { HeaderComponent } from './reusableComponents/header/header.component';
import { BarcodeInfoListViewerComponent } from './reusableComponents/barcode-info-list-viewer/barcode-info-list-viewer.component';
import { FormBuilderComponent } from './reusableComponents/form-builder/form-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskTypeCodeHandler } from './taskTypeManager/taskTypes';
import { FieldFocusDirective } from './reusableComponents/form-builder/field-focus.directive';
import { FieldAutocompleteDirective } from './reusableComponents/form-builder/field-autocomplete.directive';
import { DocumentInfoViewerComponent } from './reusableComponents/document-info-viewer/document-info-viewer.component';
import { BottomSheetOperationsHandlerComponent } from './reusableComponents/bottom-sheet-operations-handler/bottom-sheet-operations-handler.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TabDetailsViewerComponent } from './reusableComponents/tab-details-viewer/tab-details-viewer.component';
import { ConvertToStringPipe } from './Pips/convert-to-string.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    OverlayPreloaderComponent,
    HeaderComponent,
    BarcodeInfoListViewerComponent,
    FormBuilderComponent,
    FieldFocusDirective,
    FieldAutocompleteDirective,
    DocumentInfoViewerComponent,
    BottomSheetOperationsHandlerComponent,
    TabDetailsViewerComponent,
    ConvertToStringPipe,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    OverlayPreloaderComponent,
    BarcodeInfoListViewerComponent,
    FormBuilderComponent,
    DocumentInfoViewerComponent,
    BottomSheetOperationsHandlerComponent
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "outline" } },
    GetInitialDataService,
    ClientInformationService,
    HandleUnauthorizeError,
    GeneralErrorMessage,
    GeneralSuccssMessage,
    HandleSessionstorage,
    ResourceMainStore,
    TaskTypeCodeHandler
  ]
})
export class SharedModule { }
