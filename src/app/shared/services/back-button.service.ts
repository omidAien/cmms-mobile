import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackButton } from '../appModels';
import { HandleSessionstorage } from '../SharedClasses/HandleSessionStorage';
import { HeaderInfoService } from './header-info.service';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {

  private initialBackButtonStack:BackButton = {
    ObjectID: 0,
    TaskTypeCode: 0,
    Caption: "",
    RouterPath: location.hash.replace("#", ""),
    Active: false  
  };
  private backButtonStackSubject = new BehaviorSubject<BackButton[]>([]);
  
  constructor(private handleSessionstorage: HandleSessionstorage, private headerInfoService: HeaderInfoService) {

    this.backButtonRefreshPageHandler();

  }

  private backButtonRefreshPageHandler() {

    const backButtonStackFromSessionStorage: BackButton[] = this.handleSessionstorage.get("backButtonStack");

    if ( backButtonStackFromSessionStorage ) {

      // 1. setting value from sessionStorage
      this.backButtonStackSubject.next(backButtonStackFromSessionStorage);

      // 2. picking last item to set header info
      const lastBackButtonItem: BackButton = this.peek();

      this.headerInfoService.setHeaderInfo({
        Caption: lastBackButtonItem.Caption,
        Active: lastBackButtonItem.Active
      });

    } else {

      // 1. for the first time that app is started, backButtonService will be instantiated.
      this.push(this.initialBackButtonStack);

    } 

  }

  push(item: BackButton): void {

    const backButtonStack: BackButton[] = [...this.backButtonStackSubject.getValue()];
    backButtonStack.unshift(item);

    this.headerInfoService.setHeaderInfo({
      Caption: item.Caption,
      Active: item.Active
    });

    this.handleSessionstorage.set("backButtonStack", backButtonStack);

    this.backButtonStackSubject.next(backButtonStack);

  }

  pop(): void {

    const backButtonStack: BackButton[] = [...this.backButtonStackSubject.getValue()];

    backButtonStack.shift();

    this.handleSessionstorage.set("backButtonStack", backButtonStack);
    this.backButtonStackSubject.next(backButtonStack)

  }

  peek(): BackButton {

    return this.backButtonStackSubject.getValue()[0];

  }

  isEmpty(): boolean {

    return this.backButtonStackSubject.getValue().length === 0 ? true : false;

  }

  lengthStack(): number {

    return this.backButtonStackSubject.getValue().length;

  }

  reset() {

    this.backButtonStackSubject.next([]);

    this.push(this.initialBackButtonStack);

  }

}
