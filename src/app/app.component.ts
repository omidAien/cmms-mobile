import { Component } from '@angular/core';
import { ClientInformationService } from './shared/services/client-information.service';
import { GetInitialDataService } from './shared/services/get-initial-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private getInitialDataService: GetInitialDataService,
              private clientInformationService: ClientInformationService) {}

}
