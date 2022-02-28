import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { GetInitialDataService } from './services/get-initial-data.service';
import { ExtractSystemInfo } from './SharedClasses/extractSystemInfo';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    GetInitialDataService,
    ExtractSystemInfo
  ]
})
export class SharedModule { }
