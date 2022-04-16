import { Component, Input, OnInit } from '@angular/core';
import { HeaderInfoService } from '../../services/header-info.service';
import { faArrowLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BackButtonService } from '../../services/back-button.service';
import { BackButton } from '../../appModels';

@Component({
  selector: 'map-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() pageDirection: string;

  faArrowLeft: IconDefinition = faArrowLeft;

  constructor(public headerInfoService: HeaderInfoService, 
              private backButtonService: BackButtonService) { }

  ngOnInit(): void {}

  backButtonHandler(event: any) {

    if ( event.target.closest("section.header-icon") ) {

      this.backButtonService.pop();

      const lastBackButon: BackButton = this.backButtonService.peek();

      const headerInfo: Pick<BackButton, "Caption" | "Active"> = {
        Caption: lastBackButon.Caption,
        Active: lastBackButon.Active
      }

      this.headerInfoService.setHeaderInfo(headerInfo);

    }

  }

}
