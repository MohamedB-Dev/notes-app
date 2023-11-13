import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthData } from "../models/AuthData.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly BASE_URL = 'http://localhost:3000';
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private username: string;
    private authstatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return this.token;
    }

    getAuthStatusListener() {
        return this.authstatusListener.asObservable();
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    getUsername() {
        return this.username;
    }

    createUser(username: string, email: string, password: string) {
        const authData: AuthData = { username: username, email: email, password: password };
        this.http.post(`${this.BASE_URL}/user/signup`, authData)
            .subscribe(response => {
            });
    }

    login(email: string, password: string) {
        const authData: AuthData = { username: null, email: email, password: password };
        this.http.post<{ token: string, expiresIn: number, userId: string, username: string }>(`${this.BASE_URL}/user/login`, authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.userId = response.userId;
                    this.username = response.username;
                    this.authstatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.saveAuthData(token, expirationDate, this.userId, this.username);
                    this.router.navigate(['/']);
                }
            });
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.username = authInformation.username;
            this.authstatusListener.next(true);
            this.setAuthTimer(expiresIn / 1000);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authstatusListener.next(false);
        this.userId = null;
        this.username = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/login']);
    }

    
    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string, username: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId,
            username: username
        }
    }

}