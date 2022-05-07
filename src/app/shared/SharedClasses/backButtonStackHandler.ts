import { Injectable } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { Router } from "@angular/router";
import { PWAItemsService } from "src/app/dashboard/Services/pwaitems.service";
import { BackButton } from "../appModels";
import { BackButtonService } from "../services/back-button.service";
import { HeaderInfoService } from "../services/header-info.service";
import { TaskTypeCodeHandler } from "../taskTypeManager/taskTypes";

@Injectable()
export class UpdateHeaderComponentHandler {

    constructor(private headerInfoService: HeaderInfoService) {}
    
    updateHeader(backButon: BackButton) {

        const headerInfo: Pick<BackButton, "Caption" | "Active"> = {
            Caption: backButon.Caption,
            Active: backButon.Active 
        };

        this.headerInfoService.setHeaderInfo(headerInfo);

    }
}

@Injectable()
export class UpdatePWAItemsHandler {

    constructor(private pwaItemsService: PWAItemsService, private router: Router ) {}

    updatePWAItems(backButon: BackButton): void {

        const dashboardRouterPath: string = "/dashboard";

        if ( this.router.url === dashboardRouterPath  ) {

            this.pwaItemsService.reset();
            this.pwaItemsService.getItems(backButon.ObjectID);

        }

    }
}

@Injectable()
export class UpdateURLHandler {

    constructor(private taskTypeCodeHandler: TaskTypeCodeHandler) {}

    changeUrl(backButon: BackButton) {

        this.taskTypeCodeHandler.navigator(backButon.TaskTypeCode);

    }

}

@Injectable()
export class BackButtonStackRoutineUpdator {

    constructor(private backButtonService: BackButtonService,
                private updateHeaderComponentHandler: UpdateHeaderComponentHandler,
                private updatePWAItemsHandler: UpdatePWAItemsHandler,
                private updateURLHandler: UpdateURLHandler) {}

    updatePageContent() {

        this.backButtonService.pop();

        const lastBackButon: BackButton = this.backButtonService.peek();

        this.updateHeaderComponentHandler.updateHeader(lastBackButon);

        this.updatePWAItemsHandler.updatePWAItems(lastBackButon);
  
        this.updateURLHandler.changeUrl(lastBackButon);

    }                

}

@Injectable()
export class DashboardTypeBackButtonStackHandler {

    constructor(private backButtonStackRoutineUpdator: BackButtonStackRoutineUpdator) {}

    backButtonStackHandler() {

        this.backButtonStackRoutineUpdator.updatePageContent();

    }

}

@Injectable()
export class WarehouseReceiptTypeBackButtonStackHandler {

    constructor(private bottomSheet: MatBottomSheet,
                private backButtonStackRoutineUpdator: BackButtonStackRoutineUpdator) {}

    backButtonStackHandler() {

        // open snack bar
        console.log("open snack bar");

    }

}

@Injectable()
export class ButtonStackStoreHandler {

    private instanceHandler: { [key: string]: any } = {};

    constructor(private dashboardTypeBackButtonStackHandler: DashboardTypeBackButtonStackHandler,
                private backButtonService: BackButtonService,
                private warehouseReceiptTypeBackButtonStackHandler: WarehouseReceiptTypeBackButtonStackHandler) {}

    private setInstaceHandler() {

        this.instanceHandler["0"] = this.dashboardTypeBackButtonStackHandler;
        this.instanceHandler["2"] = this.warehouseReceiptTypeBackButtonStackHandler;

    }            

    BackButtonStackHandlerDetector() {

        this.setInstaceHandler();

        const lastBackButton: BackButton = this.backButtonService.peek();

        this.instanceHandler[lastBackButton.TaskTypeCode].backButtonStackHandler();

    }

}