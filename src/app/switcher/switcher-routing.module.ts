import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailFormComponent } from './warehouse-receipt-type/detail-form/detail-form.component';
import { DetailViewerComponent } from './warehouse-receipt-type/detail-viewer/detail-viewer.component';
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
    component: DetailViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwitcherRoutingModule { }
