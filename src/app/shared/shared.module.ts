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



@NgModule({
  declarations: [
    FooterComponent,
    OverlayPreloaderComponent,
    HeaderComponent,
    BarcodeInfoListViewerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    OverlayPreloaderComponent
  ],
  providers: [
    GetInitialDataService,
    ClientInformationService,
    HandleUnauthorizeError,
    GeneralErrorMessage,
    GeneralSuccssMessage,
    HandleSessionstorage,
    ResourceMainStore
  ]
})
export class SharedModule { }
