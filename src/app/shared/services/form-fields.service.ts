import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableField } from '../appModels';

@Injectable({
  providedIn: 'root'
})
export class FormFieldsService {

  private formFieldsSubject = new BehaviorSubject<TableField[]>(null);
  formFields$: Observable<TableField[]> = this.formFieldsSubject.asObservable();

  constructor() { }

  set(value: TableField[]): void {

    this.formFieldsSubject.next(value);

  }

  get(): TableField[] {

    return this.formFieldsSubject.getValue();

  }

  reset() {

    this.formFieldsSubject.next(null);

  }

}
