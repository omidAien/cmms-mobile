import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DesignViewDirective } from './Directives/design-view.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DesignViewDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
