import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import { Answer } from '../Classes/Answer/answer';
import { Question } from '../Classes/Question/question';
import { User } from '../Classes/User/user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GeneralServiceService } from '../service/general-service.service';

@Component({
  selector: 'app-forum-v2',
  templateUrl: './forum-v2.component.html',
  styleUrls: ['./forum-v2.component.css']
})
export class ForumV2Component implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl(''),
  });
  // this is where we get the user info of who is logged in.
  currentuser: User;
  currentquestion: Question;
  // this where we get the current question they are busy with
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private GeneralService: GeneralServiceService) {

    }
  Answers: Array<Answer> = [];
  show = false;
  equal = false;
  Answer: Answer;
  temp = new Answer();
  count = 0;
  quesionid = 0;
  ngOnInit() {
    if (this.Answers.length === 0) {
      this.show = false;
    } else {
      this.show = true;
    }
    console.log(this.Answers.length);
    this.getTheAnswers();
    // this.route.params.switchMap((params:Params) => this.GeneralService.getAnswers
    // (+params['id'])).subscribe((answer) => this.Answer = answer);
  }

  getTheAnswers() {
    // this.quesionid = +this.route.snapshot.params['id'];
    // console.log("it nope"+ this.quesionid);
    // this.GeneralService.getAnswers(this.quesionid);
    this.route.params.subscribe(params => {console.log(params), this.quesionid = params.id; });

  }
  // send() {
  //     // this is where we create add the question id to the system.
  //     this.temp = this.profileForm.value
  //     this.temp = this.quesionid;
  //     //this.Answer =
  //     //1this.GeneralService.add
  //     this.Answers.push(this.temp);
  //     this.GeneralServiceService.a
  //     console.log(this.Answers);
  //     this.ngOnInit();
  //       }
        goBack() {

          this.router.navigate(['/forum']);

        }
        random() {
          // const Qid =  (Math.round(Math.random() * 100));
           this.count = this.count + 1;
           return this.count;

        }
}
