import { ILoginPageTextResources, ResourceCultureStore } from "./resourceModels";

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
