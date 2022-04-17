import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarcodeInfoListService {

  private barcodeInfoListSubject = new BehaviorSubject<any[]>(null);
  public barcodeInfoList$: Observable<any[]> = this.barcodeInfoListSubject.asObservable();

  constructor() { }

  set() {}

  reset() {}

}
