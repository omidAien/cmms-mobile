import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BehaviorSubject, Observable } from 'rxjs';
import { OperationButton } from '../appModels';
import { BottomSheetOperationsHandlerComponent } from '../reusableComponents/bottom-sheet-operations-handler/bottom-sheet-operations-handler.component';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetOperationsService {

  private buttonsSubject = new BehaviorSubject<OperationButton[]>(null);
  buttons$: Observable<OperationButton[]> = this.buttonsSubject.asObservable();

  constructor(private bottomSheet: MatBottomSheet) { }

  set(value: OperationButton[]) {

    this.reset();

    this.buttonsSubject.next(value);

  }

  private hasValue(): boolean {

    return this.buttonsSubject.getValue() ? true : false;

  }

  open(): void {

    this.hasValue() ? this.bottomSheet.open(BottomSheetOperationsHandlerComponent) : null;

  }

  reset() {

    this.buttonsSubject.next(null);

  }


}
