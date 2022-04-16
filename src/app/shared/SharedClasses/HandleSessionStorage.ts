import { Injectable } from "@angular/core";

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

        sessionStorage.removeItem("userIsLogin");
        sessionStorage.removeItem("userFullName");
        sessionStorage.removeItem("userWorkstations");
        sessionStorage.removeItem("userWorkGroups");
        sessionStorage.removeItem("userDefaultWorkGroup");
        sessionStorage.removeItem("userProjects");
        sessionStorage.removeItem("userDefaultProject");
        sessionStorage.removeItem("selectedWorkStation");
        sessionStorage.removeItem("backButtonStack");
                
    }

}