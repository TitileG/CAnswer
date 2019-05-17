import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

// import { User } from '../_models';
// import { UserService, AuthenticationService, PostService } from '../_services';
import { Article } from '../_models/article';
import { PostService } from '../_services/post.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    // currentUser: User;
    currentUserSubscription: Subscription;
    // users: User[] = [];
    articles: Article[] = [];
    selectedFile: any;

    constructor(
        // private authenticationService: AuthenticationService,
        // private userService: UserService,
        private articleService: PostService
    ) {
        // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        //     this.currentUser = user;
        // });
    }

    ngOnInit() {
        // this.loadAllUsers();
        // this.loadAllArticles();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id).pipe(first()).subscribe(() => {
    //         this.loadAllUsers();
    //     });
    // }

    // private loadAllUsers() {
    //     this.userService.getAll().pipe(first()).subscribe(users => {
    //         this.users = users;
    //     });
    // }

    private loadAllArticles(){
      this.articleService.getAll().pipe(first()).subscribe(articles =>{
        this.articles = articles;
      });
    }
  }