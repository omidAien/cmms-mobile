import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackButton } from '../appModels';

@Injectable({
  providedIn: 'root'
})
export class HeaderInfoService {

  private headerInfoSubject = new BehaviorSubject<Pick<BackButton, "Caption" | "Active">>(null);
  headerInfo$: Observable<Pick<BackButton, "Caption" | "Active">> = this.headerInfoSubject.asObservable();

  constructor() {}

  setHeaderInfo(item: Pick<BackButton, "Caption" | "Active">) {

    this.headerInfoSubject.next(item);

  }


}
