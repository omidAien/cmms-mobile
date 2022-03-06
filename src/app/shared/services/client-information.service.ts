import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ClientInformation } from '../appModels';

@Injectable()
export class ClientInformationService {

  constructor(private deviceService: DeviceDetectorService, 
              private cookieService: CookieService) { 

    this.getDeviceInfo();           

  }

  getUserLocation() {

    const siteProtocol:string = window.location.protocol;
    let _longitude:number = 0;
    let _latitude:number = 0;

    if ( navigator && navigator.geolocation && siteProtocol === "https" ) {

      navigator.geolocation.getCurrentPosition((position) => {

        _longitude = position.coords.longitude;
        _latitude = position.coords.latitude;

      }),
      (error: any) => {

        _longitude = 0;
        _latitude = 0;

      }

    }

    return { 
      longitude: _longitude,
      latitude: _latitude 
    };

  }


  getDeviceInfo() {

    const res: { longitude:number; latitude:number } = this.getUserLocation();

    const clientDeviceInformation:ClientInformation = {
      browser: this.deviceService.browser,
      browserVersion : this.deviceService.browser_version,
      device : this.deviceService.device,
      deviceType : this.deviceService.deviceType,
      orientation : this.deviceService.orientation,
      os : this.deviceService.os,
      osVersion : this.deviceService.os_version,
      ip : "",
      mac: "",
      agent : this.deviceService.userAgent,
      longitude: res.longitude,
      latitude: res.latitude
    };

    this.cookieService.set("clientInformation", JSON.stringify(clientDeviceInformation));

  }

}
