export interface AppSettings {
    API_URL_INTERNAL:string; 
    API_URL_EXTERNAL:string; 
    Origin_EXTERNAL:string
};

export interface ErrorModel {
    hasError: boolean,
    Code: number;
    Message: string;
    MessageViewType: number;
    LogData:any;
    LogID: number;
}

export interface SystemInformation {
    Direction:string;
    Caption:string;
    Remark:string;
    Version:string;
    ReleaseDate:string;
    PoweredBy:string;
    Culture:string;
    Logo:string;
    Wallpaper:string;
}

export interface SystemInformationCore {
    Error: ErrorModel | null;
    dtSystemInformation: SystemInformation[];
}

export interface clientInformation {
    browser: string;
    browserVersion: string;
    device: string;
    deviceType: string;
    orientation: string;
    os: string;
    osVersion: string;
    ip: string;
    mac: string;
    agent: string;
    latitude: number;
    longitude: number;
}

export interface Workstation {
    PK_ObjectID:number;
    Caption: string;
}

export interface UserWorkgroup {
    PK_WorkgroupID: number;
    Workgroup: string;
}

export interface UserProject {
    PK_ProjectID: number;
    Project: string;
    isDefault: boolean;
}

export interface AuthenticateParameters {
    userID:string;
    userPSW:string;
    workstationID:number;
    workgroupID:number;
    clientInformation:clientInformation;
}

export interface AuthenticateResponse {
    Error: ErrorModel;
    Token: string | null;
    UserName: string;
    Workstations: Workstation[];
    Workgroups: UserWorkgroup[] | null;
    DefaultWorkgroupID: number | UserWorkgroup;
    Projects: UserProject[];
}