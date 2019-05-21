import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    selectedFile: any;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
    
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        // this.currentUserSubscription.unsubscribe();
    }

   

  
    onFileChanged(event) {
        this.selectedFile = event.target.files[0]
      }
    
      onUpload() {
        // upload code goes here
      }
        public imagePath;
        imgURL: any;
        public message: string;
       
        preview(files) {
          if (files.length === 0)
            return;
       
          var mimeType = files[0].type;
          if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
          }
       
          var reader = new FileReader();
          this.imagePath = files;
          reader.readAsDataURL(files[0]); 
          reader.onload = (_event) => { 
            this.imgURL = reader.result; 
          }
        }
      }
