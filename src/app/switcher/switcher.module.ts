import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwitcherRoutingModule } from './switcher-routing.module';
import { WarehouseReceiptTypeComponent } from './warehouse-receipt-type/warehouse-receipt-type.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { LabelingTypeComponent } from './labeling-type/labeling-type.component';


@NgModule({
  declarations: [
    WarehouseReceiptTypeComponent,
    LabelingTypeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    SwitcherRoutingModule
  ]
})
export class SwitcherModule { }
