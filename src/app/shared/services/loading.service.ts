import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, delay, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  showPreLoaderUntilCompleted<T>(obs$: Observable<T>, hasDelay:boolean = false, duration:number = 0): Observable<T> {
    return of(null)
            .pipe(
              tap(() => this.loadingOn()),
              hasDelay ? delay(duration) : delay(duration),
              concatMap(() => obs$),
              finalize(() => this.loadingOff())
            )
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
  
}
