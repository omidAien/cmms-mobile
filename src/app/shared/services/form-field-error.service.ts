import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogData } from '../appModels';


@Injectable({
  providedIn: 'root'
})
export class FormFieldErrorService {

  private formFieldErrorSubject = new BehaviorSubject<LogData[]>(null);
  formFieldError$: Observable<LogData[]> = this.formFieldErrorSubject.asObservable();

  constructor() { }

  setLogData(logDataJsonData: string) {

    const _logData:LogData[] = JSON.parse(logDataJsonData);

    this.formFieldErrorSubject.next(_logData);

  }

  reset() {

    this.formFieldErrorSubject.next(null);

  }

}
