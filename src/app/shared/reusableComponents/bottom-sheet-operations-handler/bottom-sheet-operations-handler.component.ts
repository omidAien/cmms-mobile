import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { BackButton } from '../../appModels';
import { BackButtonService } from '../../services/back-button.service';
import { BottomSheetOperationsService } from '../../services/bottom-sheet-operations.service';

@Component({
  selector: 'map-bottom-sheet-operations-handler',
  templateUrl: './bottom-sheet-operations-handler.component.html',
  styleUrls: ['./bottom-sheet-operations-handler.component.scss']
})
export class BottomSheetOperationsHandlerComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private bottomSheetRef: MatBottomSheetRef<BottomSheetOperationsHandlerComponent>,
              private router: Router, 
              public bottomSheetOperationsService: BottomSheetOperationsService,
              private backButtonService: BackButtonService) { }

  ngOnInit(): void {
  }

  onClick() {

    this.router.navigateByUrl(`${this.router.url}/detail-form`);

    const backBtn: BackButton = {
      ObjectID: 0,
      Caption: "",
      TaskTypeCode: 0,
      RouterPath: this.router.url,
      Active: true
    };

    this.backButtonService.push(backBtn);

    this.bottomSheetRef.dismiss();

  }

  showDetails() {

    this.router.navigateByUrl(`${this.router.url}/detail-viewer`);

    const backBtn: BackButton = {
      ObjectID: 0,
      Caption: "",
      TaskTypeCode: 0,
      RouterPath: this.router.url,
      Active: true
    };

    this.backButtonService.push(backBtn);

    this.bottomSheetRef.dismiss();

  }

  btnOperationHandler(event: any) {

    this.router.navigateByUrl(`${this.router.url}/detail-viewer`);

    const backBtn: BackButton = {
      ObjectID: 0,
      Caption: "",
      TaskTypeCode: 0,
      RouterPath: this.router.url,
      Active: true
    };

    this.backButtonService.push(backBtn);

    this.bottomSheetRef.dismiss();
    
  }

}
