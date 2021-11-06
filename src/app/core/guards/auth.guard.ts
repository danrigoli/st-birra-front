import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate() {
        if (!(await this.authService.isAuthenticated())) {
            this.router.navigate(["/login"]);
            return false;
        } else return true;
    }

    async canLoad() {
        return !(await this.authService.isAuthenticated());
    }
}