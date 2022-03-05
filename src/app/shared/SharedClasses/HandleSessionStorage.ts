import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
class HandleSessionstorage {

    set(key:string, value:any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    get(key:string) {
        return JSON.parse(sessionStorage.getItem(key));
    }

}