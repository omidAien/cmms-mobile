import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SystemInformation } from "../appModels";
import { ResourceMainStore } from "../ResourceManager/resourseMainStore";
import { ServerErrorMessageService } from "../services/server-error-message.service";
import { ExtractSystemInfo } from "./extractSystemInfo";
import { HandleSessionstorage } from "./HandleSessionStorage";


class ShowMessage {

    /** Possible values for horizontalPosition on MatSnackBarConfig. */
    // MatSnackBarHorizontalPosition = 'start' | 'center' | 'end' | 'left' | 'right';

    /** Possible values for verticalPosition on MatSnackBarConfig. */
    // MatSnackBarVerticalPosition = 'top' | 'bottom';

    private _horizontalPosition: MatSnackBarHorizontalPosition = "center";
    private _verticalPosition: MatSnackBarVerticalPosition = "top";
    private _duration: number = 2500;
    private _massagePanelClass:string = "mat-snack-bar-container-successful";
    private _direction: string;
    private _culture: string;

    constructor(private snackBar: MatSnackBar, 
                private handleSessionstorage: HandleSessionstorage,
                private extractSystemInfo: ExtractSystemInfo) {

        this.getPageInfo();

    }

    private getPageInfo() {

        this.extractSystemInfo
            .systemInfo$
            .subscribe((response: SystemInformation) => {

                if ( response ) {

                    this.culture = response.Culture;

                    this.direction = response.Direction;

                } else {

                    const pageInfo: Pick<SystemInformation, "Direction" | "Culture"> = this.handleSessionstorage.get("pageInfo");

                    if ( pageInfo ) {
            
                        this.culture = pageInfo.Culture;
            
                        this.direction = pageInfo.Direction;
            
                    } else {
            
                        this.culture = 'en';
            
                        this.direction = "ltr";
            
                    }

                }

            });

    }

    showMessage(message:string) {

        this.snackBar.open(message, '', {
            direction: this.direction === 'rtl' ? 'rtl' : 'ltr',
            duration: this.duration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: this.massagePanelClass
        });

    }

    set horizontalPosition(value: MatSnackBarHorizontalPosition) {

        this._horizontalPosition = value;

    }

    get horizontalPosition(): MatSnackBarHorizontalPosition {

        return this._horizontalPosition;

    }

    set verticalPosition(value: MatSnackBarVerticalPosition) {

        this._verticalPosition = value;

    }

    get verticalPosition(): MatSnackBarVerticalPosition {

        return this._verticalPosition;

    }

    set duration(value: number) {

        this._duration = value;

    }

    get duration(): number {

        return this._duration;

    }

    set massagePanelClass(value: string) {

        this._massagePanelClass = value;

    }

    get massagePanelClass() {

        return this._massagePanelClass;

    }

    set direction(value: string) {

        this._direction = value;

    }

    get direction() {

        return this._direction;

    }

    set culture(value: string) {

        this._culture = value;

    }

    get culture() {

        return this._culture;

    }

}


@Injectable()
export class HandleUnauthorizeError extends ShowMessage {

    constructor(snackBar: MatSnackBar,
                private resourceMainStore: ResourceMainStore,
                handleSessionstorage: HandleSessionstorage,
                extractSystemInfo: ExtractSystemInfo,
                private router: Router) {

        super(snackBar, handleSessionstorage, extractSystemInfo);

        this.resourceMainStore.culture = this.culture;
                          
    }

    excuteTask(error: HttpErrorResponse) {

        switch (error.status) {

        case 401: 
            sessionStorage.removeItem("userIsLogin");
            this.router.navigateByUrl("/");
            window.location.reload();
            break;

        case 404:
            const NotFoundMessage: string = this.resourceMainStore.getAPIResponseErrorMessageTextResource();
            this.showMessage(NotFoundMessage);    
            break;

        case 0:
            const UnknownMessage:string = this.resourceMainStore.getNetworkDisconnectedTextResource();
            this.showMessage(UnknownMessage);
            break;

        }

    }

}

@Injectable()
export class GeneralErrorMessage extends ShowMessage {

    constructor(snackBar: MatSnackBar,
                private resourceMainStore: ResourceMainStore,
                handleSessionstorage: HandleSessionstorage,   
                extractSystemInfo: ExtractSystemInfo,
                private serverErrorMessageService: ServerErrorMessageService) {
        
        super(snackBar, handleSessionstorage, extractSystemInfo);   
        
        this.resourceMainStore.culture = this.culture;

    }

    unhandleServerSideError() {

        const generalMessage:string = "خطایی سمت سرور رخ داده است";

        this.showMessage(generalMessage);

    }

    handleServerSideError(message:string, ) {

        this.showMessage(message);

    }

    handleDatabaseSideError(message: string) {

        this.serverErrorMessageService.setMessage(message);

    }

    handleClientSideError(message:string, ) {
        
        this.showMessage(message);

    }

}

@Injectable()
export class GeneralSuccssMessage extends ShowMessage {

    constructor(snackBar: MatSnackBar,
                private resourceMainStore: ResourceMainStore,
                extractSystemInfo: ExtractSystemInfo,
                handleSessionstorage: HandleSessionstorage) {
        
        super(snackBar, handleSessionstorage, extractSystemInfo);

        this.resourceMainStore.culture = this.culture;

    }
    
    handleClientSideSuccess(message:string, pageDirection:string) {

        this.showMessage(message);
        
    }

}