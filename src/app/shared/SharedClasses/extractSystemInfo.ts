import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SystemInformation } from "../appModels";

@Injectable({
    providedIn: "root"
})
export class ExtractSystemInfo {

    private systemInfoSubject = new BehaviorSubject<SystemInformation>(null);
    public systemInfo$: Observable<SystemInformation> = this.systemInfoSubject.asObservable();

    setSystemInfo(value: SystemInformation) {
        this.systemInfoSubject.next(value);
    }

    getInfo() {
        return this.systemInfoSubject.value;
    }

}