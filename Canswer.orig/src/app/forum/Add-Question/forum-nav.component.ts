import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel, FormGroup, FormControl} from '@angular/forms';
import { GeneralService, AuthenticationService } from 'src/app/_services';
import { Question } from 'src/app/_models';

@Component({
  selector: 'app-forum-nav',
  templateUrl: './forum-nav.component.html',
  styleUrls: ['./forum-nav.component.css']
})
export class ForumNavComponent implements OnInit {

  constructor(private service: GeneralService,
    private AuthServ: AuthenticationService) { }
  profileForm = new FormGroup({
    Question1: new FormControl(''),
  });
  addquestion = new Question();
  ngOnInit() {
  }
  // this is the method that will add the Question to the API
Add() {
  // console.log('success');
  this.addquestion = new Question();
  // this.addquestion.ID = this.AuthServ.currentUser2.ID;
  this.addquestion.ID = 2;
  this.addquestion.Question1 = this.profileForm.controls['Question1'].value;
  // console.log(this.addquestion);
  this.service.AddQuestion(this.addquestion);
}
}
