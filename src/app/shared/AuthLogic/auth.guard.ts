import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    userIsLogin = () => {
        
        const userIsLogin = sessionStorage?.getItem("userIsLogin");

        userIsLogin ? '' : this.router.navigateByUrl("/account/login");

        return userIsLogin ? true : false;

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        return this.userIsLogin.call(null);

    }

}