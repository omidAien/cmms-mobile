import { Injectable } from "@angular/core";
import { resourceCultureStore } from "src/assets/Resources/resourceCulture";
import * as RClasses from "./generateResourceClass";
import * as IRModels from "./resourceModels";

class BaseResourceMainStore {

    private _resourceCultureStore: { [key:string]: IRModels.ResourceCultureStore };
    private _culture: string;
    private _resourceCulture: IRModels.ResourceCultureStore;

    set resourceCultureStore(value: any) {
        this._resourceCultureStore = value;
    }

    get resourceCultureStore() {
        return this._resourceCultureStore;
    }

    set culture(value: string) {
        this._culture = value;
        this._resourceCulture = this.resourceCultureStore[value];
    }

    get culture() {
        return this._culture;
    }

    set resourceCulture(value: IRModels.ResourceCultureStore) {
        this._resourceCulture = value;
    }

    get resourceCulture() {
        return this._resourceCulture;
    }

}

@Injectable()
export class ResourceMainStore extends BaseResourceMainStore {

    constructor() {
        super();
        this.resourceCultureStore = resourceCultureStore;
    }

    private executerHandler(instance: RClasses.ResourceHandler): any {

        if ( this.culture ) {
  
            return instance.getResource();

        } else {

            throw new Error("Please Enter The Suitable Culture.");

        }

    }

    getLoginPageTextResources(): IRModels.ILoginPageTextResources {

        const instance = new RClasses.LoginPageTextResources(this.resourceCulture);
        
        return this.executerHandler(instance);

    }

    getSelectWorkgroupPageTextResources(): IRModels.ISelectWorkgroupPageTextResources {

        const instance = new RClasses.SelectWorkgroupPageTextResources(this.resourceCulture);
        
        return this.executerHandler(instance);

    }

    getNetworkDisconnectedTextResource(): string {

        const instance = new RClasses.NetworkDisconnectedTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getServerBadRequestTextResource(): string {

        const instance = new RClasses.ServerBadRequestTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getBaseCRUDImagePathTextResource(): string {

        const instance = new RClasses.BaseCRUDImagePathTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getGeneralServerErrorMessageTextResource(): string {

        const instance = new RClasses.GeneralServerErrorMessageTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getFormFieldErrorMessageTextResource(): string {

        const instance = new RClasses.FormFieldErrorMessageTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getInvalidBarcodeLengthErrorMessageTextResource(): string {

        const instance = new RClasses.InvalidBarcodeLengthErrorMessageTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getOperationButtonTextResource(): string {

        const instance = new RClasses.OperationButtonTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getDocumentNumberTextResource(): string {

        const instance = new RClasses.DocumentNumberTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getDocumentDateTextResource(): string {

        const instance = new RClasses.DocumentDateTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getAPIResponseErrorMessageTextResource(): string {

        const instance = new RClasses.APIResponseErrorMessageTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getDocumentDescriptionFieldLabelTextResource(): string {

        const instance = new RClasses.DocumentDescriptionFieldLabelTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getSubmitDetailsButtonTextResource(): string {

        const instance = new RClasses.SubmitDetailsButtonTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getSubmitDetailsHeaderCaptionTextResource(): string {

        const instance = new RClasses.SubmitDetailsHeaderCaptionTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getNoDataForRepresentationTextResource(): string {

        const instance = new RClasses.NoDataForRepresentationTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

}