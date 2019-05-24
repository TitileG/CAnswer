import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import { Answer } from 'src/app/_models';
import { Question } from 'src/app/_models';
import { User } from 'src/app/_models';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GeneralService, AuthenticationService } from 'src/app/_services';

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
    private GeneralServices: GeneralService,
    private Authen: AuthenticationService ) {

    }
  Answers: Array<Answer> = [];
  show = false;
  equal = false;
  temp: Answer;
  count = 0;
  quesionid = 0;
  ngOnInit() {
    // if (this.Answers.length === 0) { // <--- this was used to see if the array was null
    //   this.show = false;
    // } else {
    //   this.show = true;
    // }
    // console.log(this.Answers.length);
    this.getTheAnswers().subscribe(data => this.Answers = data);
    this.Answers.sort();
  }

  getTheAnswers() {
    this.quesionid = +this.route.snapshot.params['id']; // <--this is used to get the answers related to the Question
    return this.GeneralServices.getAnswers(this.quesionid);

  }
  send() {
      // this is where we create add the question id to the system.
      this.temp = new Answer();
      // here we assgin the current user information so can be added to the Answer given
      this.currentuser = this.Authen.currentUser2;
      this.temp.UserID = this.random(); // <-----this here assgin the current user Id to the Answer given
      this.temp.Answer = this.profileForm.controls['name'].value;
      this.temp.QuestionID = this.quesionid; // <------ this here is used to assign the question ID to the answer
      // this.Answers.push(this.temp); <---this is used for demo version
      this.GeneralServices.AddAnswer(this.temp);
      // console.log(this.Answers);<---this is used for to see what the data is
      this.ngOnInit();
        }
        goBack() {

          this.router.navigate(['/forum']);

        }
        random() {
           this.count = this.count + 1;
           return this.count;

        }
}
