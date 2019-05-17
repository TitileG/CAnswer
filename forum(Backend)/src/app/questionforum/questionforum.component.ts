import { Component, OnInit } from '@angular/core';
import { Question } from '../Classes/Question/question';
import { GeneralServiceService } from '../service/general-service.service';


@Component({
  selector: 'app-questionforum',
  templateUrl: './questionforum.component.html',
  styleUrls: ['./questionforum.component.css']
})
export class QuestionforumComponent implements OnInit {

  constructor(private service: GeneralServiceService) { }
  show = false;
  Questions: Array<Question> = [];
  Question: Question;
  singleQuestion = new Question();
  ngOnInit() {
    // this.getQuestions().subscribe(data => this.Questions = data);
    // console.log('hello');
    this.singleQuestion.ID = 1;
    this.singleQuestion.Question1 = 'How old are we now?';
    this.singleQuestion.ColabID = 12;
    this.Questions.push(this.singleQuestion);
    console.log(this.Questions);
    if (this.Questions.length === 0) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
getQuestions() {
  return this.service.getQuestion();
}
}
