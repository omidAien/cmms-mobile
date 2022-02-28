import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const userIsLogin = sessionStorage?.getItem("userIsLogin");
        return userIsLogin ? true : false 

    }

}