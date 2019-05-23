import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel, FormGroup, FormControl} from '@angular/forms';
import { GeneralServiceService } from '../service/general-service.service';
import { Question } from '../Classes/Question/question';

@Component({
  selector: 'app-forum-nav',
  templateUrl: './forum-nav.component.html',
  styleUrls: ['./forum-nav.component.css']
})
export class ForumNavComponent implements OnInit {

  constructor(private service: GeneralServiceService) { }
  profileForm = new FormGroup({
    Question1: new FormControl(''),
  });
  addquestion = new Question();
  ngOnInit() {
  }
Add() {
  console.log('success');
  this.addquestion = this.profileForm.value;
  console.log(this.addquestion);
  this.service.AddQuestion(this.addquestion);
}
}
