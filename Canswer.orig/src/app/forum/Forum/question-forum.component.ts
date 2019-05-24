import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/_models';
import { GeneralService } from 'src/app/_services';


@Component({
  selector: 'app-question-forum',
  templateUrl: './question-forum.component.html',
  styleUrls: ['./question-forum.component.css']
})
export class QuestionForumComponent implements OnInit {

  constructor(private service: GeneralService) { }
  show = false;
  Questions: Array<Question> = [];
  Question: Question;
  singleQuestion = new Question();
  ngOnInit() {
    this.getQuestions().subscribe(data => this.Questions = data);
    // console.log('hello');
    // this.singleQuestion.ID = 1;  <----- this used as demo version
    //  this.singleQuestion.Question1 = 'How old are we now?';
    //  this.singleQuestion.ColabID = 12;
    //  this.Questions.push(this.singleQuestion); <----- >
    //  console.log(this.Questions);
    // if (this.Questions.length === 0) {
    //   this.show = false;
    // } else {
    //   this.show = true;
    // }
  }
  // this gets the questions that need to be displayed
getQuestions() {
  return this.service.getQuestion();
}
// this will be used to search for a Question
SearchQuestion() {
// this.service.SearchQuestion().subscribe(data => this.Questions = data);
}
clear() {
  this.getQuestions().subscribe(data => this.Questions = data);
}
}
