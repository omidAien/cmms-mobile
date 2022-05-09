import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

interface TaskTypeCode {
    componentName: string;
    routerPath: string;
}

@Injectable()
export class TaskTypeCodeInfo {

    TaskTypeCodes: { [key:string]: TaskTypeCode } = {
        "0": {
            componentName: "DashboardComponent",
            routerPath: "/dashboard"
        },
        "1": {
            componentName: "LabelingTypeComponent",
            routerPath: "/swcomp/labeling"
        },
        "2": {
            componentName: "WarehouseReceiptTypeComponent",
            routerPath: "/swcomp/wrt"
        }
    }

}

@Injectable()
export class TaskTypeCodeHandler {

    constructor(private router: Router, 
                private taskTypeCodeInfo: TaskTypeCodeInfo) {}

    navigator(taskTypeCode: number) {

        const routerPath: string = this.taskTypeCodeInfo.TaskTypeCodes[taskTypeCode].routerPath;

        this.router.navigateByUrl(routerPath);
 
    }

}