import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OperationButton } from '../appModels';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetOperationsService {

  private buttonsSubject = new BehaviorSubject<OperationButton[]>(null);
  buttons$: Observable<OperationButton[]> = this.buttonsSubject.asObservable();

  constructor() { }

  set(value: OperationButton[]) {

    this.buttonsSubject.next(value);

  }

  reset() {

    this.buttonsSubject.next(null);

  }


}
