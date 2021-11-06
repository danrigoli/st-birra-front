import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private api = environment.backendUrl + '/api/'

    public constructor(public http: HttpClient) {}


    public get<T> (endpoint: string, options?: any): Observable<any> {
        return this.http.get<T>(this.api + endpoint, options)
    }

    public post<T> (endpoint: string, options?: any): Observable<any> {
        return this.http.post<T>(this.api + endpoint, options)
    }

    public put<T> (endpoint: string, options?: any): Observable<any> {
        return this.http.put<T>(this.api + endpoint, options)
    }

    public delete<T> (endpoint: string, options?: any): Observable<any> {
        return this.http.delete<T>(this.api + endpoint, options)
    }
}