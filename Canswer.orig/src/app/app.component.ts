import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService ,UserService} from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    showMenu = false;
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
        ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    toggleMenu() {
        this.showMenu = !this.showMenu;
      }

  
    
}
