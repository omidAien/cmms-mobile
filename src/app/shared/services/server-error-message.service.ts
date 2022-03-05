import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorMessageService {

  private serverErrorMessageSubject = new BehaviorSubject<string>(null);
  public serverErrorMessage$: Observable<string> = this.serverErrorMessageSubject.asObservable();

  constructor() { }

  setMessage(msg: string) {
    this.serverErrorMessageSubject.next(msg);
  }
  
}
