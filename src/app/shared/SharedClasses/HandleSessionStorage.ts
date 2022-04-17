import { Injectable } from "@angular/core";
import { SystemInformation } from "../appModels";

@Injectable({
    providedIn: "root"
})
export class HandleSessionstorage {

    set(key:string, value:any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    get(key:string) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    reset() {

        const baseURL: string = this.get("baseURL");
        const pageInfo: Pick<SystemInformation, "Direction" | "Culture"> = this.get("pageInfo");

        sessionStorage.clear();

        this.set("baseURL", baseURL);
        this.set("pageInfo", pageInfo);
        
    }

}