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