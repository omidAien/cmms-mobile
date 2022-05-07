import { Component, OnInit } from '@angular/core';
import { HeaderInfoService } from '../../services/header-info.service';
import { faArrowLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ButtonStackStoreHandler } from '../../SharedClasses/backButtonStackHandler';

@Component({
  selector: 'map-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faArrowLeft: IconDefinition = faArrowLeft;

  constructor(public headerInfoService: HeaderInfoService, 
              private buttonStackStoreHandler: ButtonStackStoreHandler) { }

  ngOnInit(): void {}

  backButtonHandler(event: any) {

    if ( event.target.closest("section.header-icon") ) {

      this.buttonStackStoreHandler.BackButtonStackHandlerDetector();

    }

  }

}
