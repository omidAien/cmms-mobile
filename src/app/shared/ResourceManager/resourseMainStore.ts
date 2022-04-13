import { Injectable } from "@angular/core";
import { resourceCultureStore } from "src/assets/Resources/resourceCulture";
import { BaseCRUDImagePathTextResource, 
         GeneralServerErrorMessageTextResource, 
         LoginPageTextResources,
         NetworkDisconnectedTextResource, 
         ResourceHandler, 
         ServerBadRequestTextResource} from "./generateResourceClass";
import { ILoginPageTextResources, ResourceCultureStore } from "./resourceModels";

class BaseResourceMainStore {

    private _resourceCultureStore: { [key:string]: ResourceCultureStore };
    private _culture: string;
    private _resourceCulture: ResourceCultureStore;

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

    set resourceCulture(value: ResourceCultureStore) {
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

    private executerHandler(instance: ResourceHandler): any {

        if ( this.culture ) {
  
            return instance.getResource();

        } else {

            throw new Error("Please Enter The Suitable Culture.");

        }

    }

    getLoginPageTextResources(): ILoginPageTextResources {

        const instance = new LoginPageTextResources(this.resourceCulture);
        
        return this.executerHandler(instance);

    }

    getNetworkDisconnectedTextResource(): string {

        const instance = new NetworkDisconnectedTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getServerBadRequestTextResource(): string {

        const instance = new ServerBadRequestTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getBaseCRUDImagePathTextResource(): string {

        const instance = new BaseCRUDImagePathTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

    getGeneralServerErrorMessageTextResource(): string {

        const instance = new GeneralServerErrorMessageTextResource(this.resourceCulture);

        return this.executerHandler(instance);

    }

}