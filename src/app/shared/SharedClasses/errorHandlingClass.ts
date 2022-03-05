import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ServerErrorMessageResources } from "src/assets/Resources/projectResources";
import { ServerErrorMessageService } from "../services/server-error-message.service";


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
export class HandleUnauthorizeError {

    constructor(private serverErrorMessageService: ServerErrorMessageService, private router: Router) {}

    excuteTask(error: HttpErrorResponse) {

        switch (error.status) {

        case 401: 
            sessionStorage.removeItem("userIsLogin");
            sessionStorage.removeItem("locatingTableRowAfterBackToBasicTablePageFromOrderPage");
            this.router.navigateByUrl("/");
            window.location.reload();
            break;

        case 0:
            const message:string = ServerErrorMessageResources.message;
            this.serverErrorMessageService.setMessage(message);
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