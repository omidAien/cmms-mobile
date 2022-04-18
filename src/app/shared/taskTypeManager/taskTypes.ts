import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

interface TaskTypeCode {
    componentName: string;
    routerPath: string;
}

class TaskTypeCodeInfo {

    protected TaskTypeCodes: { [key:string]: TaskTypeCode } = {
        "0": {
            componentName: "DashboardComponent",
            routerPath: "/dashboard"
        },
        "2": {
            componentName: "WarehouseReceiptTypeComponent",
            routerPath: "/swcomp/wrt"
        }
    }

}

@Injectable()
export class TaskTypeCodeHandler extends TaskTypeCodeInfo {

    constructor(private router: Router) {

        super();

    }

    navigator(taskTypeCode: number) {

        const routerPath: string = this.TaskTypeCodes[taskTypeCode].routerPath;

        this.router.navigateByUrl(routerPath);
 
    }

}