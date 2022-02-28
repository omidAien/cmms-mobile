import { Injectable } from "@angular/core";
import { SystemInformation } from "../appModels";

@Injectable()
export class ExtractSystemInfo {

    private systemInformation: SystemInformation = null;

    constructor() {

        const systemInfoFromSessionstorage:SystemInformation = JSON.parse(sessionStorage.getItem("systemInformation"));

        if ( systemInfoFromSessionstorage ) {
            this.systemInformation = systemInfoFromSessionstorage;
        }

    }

    getInfo() {
        return this.systemInformation;
    }

}