import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { BackButton, OperationButton } from '../../appModels';
import { BackButtonService } from '../../services/back-button.service';
import { BottomSheetOperationsService } from '../../services/bottom-sheet-operations.service';
import { TaskTypeCodeHandler } from '../../taskTypeManager/taskTypes';

@Component({
  selector: 'map-bottom-sheet-operations-handler',
  templateUrl: './bottom-sheet-operations-handler.component.html',
  styleUrls: ['./bottom-sheet-operations-handler.component.scss']
})
export class BottomSheetOperationsHandlerComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private bottomSheetRef: MatBottomSheetRef<BottomSheetOperationsHandlerComponent>,
              private router: Router, 
              private taskTypeCodeHandler: TaskTypeCodeHandler,
              public bottomSheetOperationsService: BottomSheetOperationsService,
              private backButtonService: BackButtonService) { }

  ngOnInit(): void {}

  btnOperationHandler(event: any, _btn: OperationButton) {

    // actionType === 710 <===> LabelSubmit&Print
    // actionType === 711 <===> LabelRPrint

    const btnObjectId: number = _btn.ObjectID;
    const btnCaption: string = _btn.Caption;
    const btnActionTypeCode: number = _btn.ActionTypeCode;
    const btnTaskTypeCode: number = _btn.TaskTypeCode;

    if ( btnActionTypeCode === 0 ) {

      if ( btnTaskTypeCode === 3 ) {

        const backBtn: BackButton = {
          ObjectID: btnObjectId,
          Caption: btnCaption,
          TaskTypeCode: btnTaskTypeCode,
          RouterPath: this.router.url,
          Active: true
        };
    
        this.backButtonService.push(backBtn);
    
        this.bottomSheetRef.dismiss();

        this.taskTypeCodeHandler.navigator(btnTaskTypeCode);

      }

    } else if ( btnActionTypeCode === 710 ) {

      const result: { status: string; objectId: number } = { status: "final-submit", objectId: btnObjectId };

      this.bottomSheetRef.dismiss(result);

    } else if ( btnActionTypeCode === 711 ) {

      this.router.navigateByUrl('swcomp/detail-form');

      const backBtn: BackButton = {
        ObjectID: btnObjectId,
        Caption: btnCaption,
        TaskTypeCode: 0,
        RouterPath: this.router.url,
        Active: true
      };
  
      this.backButtonService.push(backBtn);
  
      this.bottomSheetRef.dismiss();

    }
    
  }

}
