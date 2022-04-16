import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ResourceMainStore } from "../ResourceManager/resourseMainStore";
import { ServerErrorMessageService } from "../services/server-error-message.service";
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

    constructor(private snackBar: MatSnackBar) {}

    showMessage(message:string, pageDirection:string) {

        this.snackBar.open(message, '', {
            direction: pageDirection === 'rtl' ? 'rtl' : 'ltr',
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

}


@Injectable()
export class HandleUnauthorizeError extends ShowMessage {

    pageDirection: string = "ltr";

    constructor(snackBar: MatSnackBar,
                private resourceMainStore: ResourceMainStore,
                private handleSessionstorage: HandleSessionstorage,
                private router: Router) {

        super(snackBar);

        const pageInfo = this.handleSessionstorage.get("pageInfo");
                    
        if ( pageInfo ) {

            this.resourceMainStore.culture = pageInfo.culture;

            this.pageDirection = pageInfo.pageDirection;

        } else {

            this.resourceMainStore.culture = 'en';

            this.pageDirection = this.pageDirection;

        }
      
    }

    excuteTask(error: HttpErrorResponse) {

        switch (error.status) {

        case 401: 
            sessionStorage.removeItem("userIsLogin");
            this.router.navigateByUrl("/");
            window.location.reload();
            break;

        case 0:
            const message:string = this.resourceMainStore.getNetworkDisconnectedTextResource();
            this.showMessage(message, this.pageDirection);
            break;

        }

    }

}

@Injectable()
export class GeneralErrorMessage extends ShowMessage {

    constructor(snackBar: MatSnackBar, private serverErrorMessageService: ServerErrorMessageService) {
        
        super(snackBar);

    }

    unhandleServerSideError(pageDirection:string) {

        const generalMessage:string = "خطایی سمت سرور رخ داده است";

        this.showMessage(generalMessage, pageDirection);

    }

    handleServerSideError(message:string, pageDirection:string) {

        this.showMessage(message, pageDirection);

    }

    handleDatabaseSideError(message: string) {

        this.serverErrorMessageService.setMessage(message);

    }

    handleClientSideError(message:string, pageDirection:string) {
        
        this.showMessage(message, pageDirection);

    }

}

@Injectable()
export class GeneralSuccssMessage extends ShowMessage {

    constructor(snackBar: MatSnackBar) {
        
        super(snackBar);

    }
    
    handleClientSideSuccess(message:string, pageDirection:string) {

        this.showMessage(message, pageDirection);
        
    }

}