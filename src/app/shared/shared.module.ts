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



@NgModule({
  declarations: [
    FooterComponent,
    OverlayPreloaderComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule
  ],
  exports: [
    FooterComponent,
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
