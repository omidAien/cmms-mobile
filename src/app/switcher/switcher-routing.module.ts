import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabDetailsViewerComponent } from '../shared/reusableComponents/tab-details-viewer/tab-details-viewer.component';
import { LabelingTypeComponent } from './labeling-type/labeling-type.component';
import { DetailFormComponent } from './warehouse-receipt-type/detail-form/detail-form.component';
import { WarehouseReceiptTypeComponent } from './warehouse-receipt-type/warehouse-receipt-type.component';

const routes: Routes = [
  {
    path: "wrt",
    component: WarehouseReceiptTypeComponent,
  },
  {
    path: "wrt/detail-form",
    component: DetailFormComponent
  },
  {
    path: "wrt/detail-viewer",
    component: TabDetailsViewerComponent
  },
  {
    path: "labeling",
    component: LabelingTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwitcherRoutingModule { }
