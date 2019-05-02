import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { AuthenticationService ,UserService} from '../_services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
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

  ngOnInit() {
  }

}
