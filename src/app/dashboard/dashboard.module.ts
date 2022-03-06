import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DesignViewDirective } from './Directives/design-view.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    DashboardComponent,
    DesignViewDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
