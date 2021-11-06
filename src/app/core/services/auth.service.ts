import { ApiService } from "./api.service";
import { User } from "../interfaces/user.interface";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
export class AuthService {
    public user: User | null;
    constructor(private apiService: ApiService) { 
        this.user = null
        this.loadUser()
    }

    getToken(): string {
        this.loadUser()
        return this.user?.token ?? ''
    }

    getId(): number {
        return this.user?.id ?? 0
    }

    loadUser() {
        const storedUser = sessionStorage.getItem('user')
        if (storedUser != null) this.user = new User(JSON.parse(storedUser))
        else this.user = null
    }

    async isAuthenticated(): Promise<boolean> {
        return this.apiService.get('check').toPromise()
    }

    login(data: {email: string; password: string }): Observable<any> {
        return this.apiService.post('login', data)
    }

    logout(): void {
        this.user = null;
        sessionStorage.clear()
        this.apiService.post('logout', {})
    }

    register(data: {name: string, email: string; password: string }): Observable<any> {
        return this.apiService.post('register', data)
    }

    isAdmin(): boolean {
        return this.user?.roleId === 2
    }
    
}   