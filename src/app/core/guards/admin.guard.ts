import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AdminGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate() {
        if (!(this.authService.isAdmin())) {
            this.router.navigate(["/"]);
            return false;
        } else return true;
    }

    async canLoad() {
        return (await this.authService.isAdmin());
    }
}