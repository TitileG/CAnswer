import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public currentUser2: User;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email_address: string, password: string) {
        console.log("the API" + email_address)
        return this.http.post<any>(`${environment.apiUrl}/Users/Login`, { email_address, password })
            .pipe(map(user => {
                this.currentUser2 = user;
                // login successful if there's a jwt token in the response
                if (this.currentUser2 && this.currentUser2.usertypeID > 1) {
                    console.log("hello")
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser2));
                    this.currentUserSubject.next(this.currentUser2);
                }

                return this.currentUser2;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        console.log("phase2");
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        console.log("phase3");
    }
}