import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../appModels';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private userInfoSubject = new BehaviorSubject<UserInfo>(null);
  public userInfo$: Observable<UserInfo> = this.userInfoSubject.asObservable();

  constructor() { }

  set(value: UserInfo) {
    this.userInfoSubject.next(value);
  }

  get() {
    return this.userInfoSubject.getValue();
  }

}
