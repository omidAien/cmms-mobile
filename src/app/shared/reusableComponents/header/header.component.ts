import { Component, Input, OnInit } from '@angular/core';
import { HeaderInfoService } from '../../services/header-info.service';
import { faArrowLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BackButtonService } from '../../services/back-button.service';
import { BackButton, SystemInformation } from '../../appModels';
import { PWAItemsService } from 'src/app/dashboard/Services/pwaitems.service';
import { HandleSessionstorage } from '../../SharedClasses/HandleSessionStorage';
import { Router } from '@angular/router';
import { TaskTypeCodeHandler } from '../../taskTypeManager/taskTypes';

@Component({
  selector: 'map-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faArrowLeft: IconDefinition = faArrowLeft;

  lastBackButon: BackButton;

  constructor(public headerInfoService: HeaderInfoService, 
              private pwaItemsService: PWAItemsService,
              private taskTypeCodeHandler: TaskTypeCodeHandler,
              private handleSessionstorage: HandleSessionstorage,
              private backButtonService: BackButtonService) { }

  ngOnInit(): void {}

  getLastBackButon(): void {

    this.backButtonService.pop();

    this.lastBackButon = this.backButtonService.peek();

  }

  changeUrl() {

    this.taskTypeCodeHandler.navigator(this.lastBackButon.TaskTypeCode);

  }

  updateHeader(): void {

    const headerInfo: Pick<BackButton, "Caption" | "Active"> = {
      Caption: this.lastBackButon.Caption,
      Active: this.lastBackButon.Active
    }

    this.headerInfoService.setHeaderInfo(headerInfo);

  }

  updatePWAItems(): void {

    const pageInfo: Pick<SystemInformation, "Direction" | "Culture"> = this.handleSessionstorage.get("pageInfo");

    this.pwaItemsService.reset();
    this.pwaItemsService.getItems(this.lastBackButon.ObjectID, pageInfo.Direction);

  }

  backButtonHandler(event: any) {

    if ( event.target.closest("section.header-icon") ) {

      this.getLastBackButon();

      this.updateHeader();

      this.changeUrl();

      this.updatePWAItems();

    }

  }

}
