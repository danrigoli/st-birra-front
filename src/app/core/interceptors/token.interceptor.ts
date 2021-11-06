import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private authService: AuthService;

    constructor(private injector: Injector, public router: Router) {
        this.authService = this.injector.get(AuthService);
    }
  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if(request.body instanceof FormData) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token ? token : ''}` }
      });
    } else {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token ? token : ''}`, 'Content-Type': 'application/json' }
      });
    }
    return next.handle(request);
  }
}