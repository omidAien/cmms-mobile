import { ILoginPageTextResources, ISelectWorkgroupPageTextResources, ResourceCultureStore } from "./resourceModels";

export abstract class ResourceHandler {

    abstract getResource(): any;

}

export class LoginPageTextResources extends ResourceHandler {
    
    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): ILoginPageTextResources {

        const resources: ILoginPageTextResources = {
            loginPageUsernameText: this.resourceCulture.loginPageUsernameText,
            loginPagePasswordText: this.resourceCulture.loginPagePasswordText,
            loginPageEnterBtnText: this.resourceCulture.loginPageEnterBtnText,
            loginPageRememeberMeText:  this.resourceCulture.loginPageRememeberMeText,
            loginPageRetrievePasswordText:  this.resourceCulture.loginPageRetrievePasswordText,
            loginPageHasAccountText: this.resourceCulture.loginPageHasAccountText,
            loginPageCreateNewAccount: this.resourceCulture.loginPageCreateNewAccount
        }

        return resources;

    }

}

export class SelectWorkgroupPageTextResources extends ResourceHandler {
    
    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): ISelectWorkgroupPageTextResources {

        const resources: ISelectWorkgroupPageTextResources = {
            selectWorkGroupText: this.resourceCulture.selectWorkGroupText,
            selectWorkGroupTitleText: this.resourceCulture.selectWorkGroupTitleText,
            redirectToDashboardBtnText: this.resourceCulture.redirectToDashboardBtnText,
        }

        return resources;

    }

}

export class AccountSettingsPageTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource() {

        return;

    }

}

export class NetworkDisconnectedTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.networkDisconnectedErrorMessageText;

    }

}

export class ServerBadRequestTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.serverBadRequestErrorMessageText;

    }

}

export class BaseCRUDImagePathTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.baseCRUDImagePathText;

    }

}

export class GeneralServerErrorMessageTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.generalServerErrorMessageText;

    }

}

export class FormFieldErrorMessageTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.formFieldErrorMessageText;

    }

}

export class InvalidBarcodeLengthErrorMessageTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.invalidBarcodeLengthErrorMessageText;

    }

}

export class OperationButtonTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.operationButtonText;

    }

}

export class DocumentNumberTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.documentNumberTitleText;

    }

}

export class DocumentDateTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.documentDateTitleText;

    }

}

export class APIResponseErrorMessageTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.apiResponseErrorMessageText;

    }

}

export class DocumentDescriptionFieldLabelTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.documentDescriptionFieldLabelText;

    }

}

export class SubmitDetailsButtonTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.submitDetailsButtonText;

    }

}

export class SubmitDetailsHeaderCaptionTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.submitDetailsHeaderCaptionText;

    }

}

export class NoDataForRepresentationTextResource extends ResourceHandler {

    constructor(public resourceCulture: ResourceCultureStore) {
        super();
    }

    getResource(): string {

        return this.resourceCulture.noDataForRepresentationText;

    }

}