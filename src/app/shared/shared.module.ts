import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { GetInitialDataService } from './services/get-initial-data.service';
import { ClientInformationService } from './services/client-information.service';
import { GeneralErrorMessage, GeneralSuccssMessage, HandleUnauthorizeError } from './SharedClasses/errorHandlingClass';
import { HandleSessionstorage } from './SharedClasses/HandleSessionStorage';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    GetInitialDataService,
    ClientInformationService,
    HandleUnauthorizeError,
    GeneralErrorMessage,
    GeneralSuccssMessage,
    HandleSessionstorage
  ]
})
export class SharedModule { }
