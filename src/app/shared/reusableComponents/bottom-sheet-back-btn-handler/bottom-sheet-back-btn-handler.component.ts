import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'map-bottom-sheet-back-btn-handler',
  templateUrl: './bottom-sheet-back-btn-handler.component.html',
  styleUrls: ['./bottom-sheet-back-btn-handler.component.scss']
})
export class BottomSheetBackBtnHandlerComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>) { }

  ngOnInit(): void {
  }

  btnOperationHandler(event: any) {

    this._bottomSheetRef.dismiss(true);

  }

}
