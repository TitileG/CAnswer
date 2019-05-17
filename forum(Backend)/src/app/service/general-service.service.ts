import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../Classes/Answer/answer';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Question } from '../Classes/Question/question';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  constructor(private http: HttpClient) { }

    apiurl = 'http://localhost:51587/api/Users/';
  //   getAnswers(id: number) {
  //   return this.http.get('http://localhost:51587/api/Users/getAnswers',id).subscribe();
  // }
  getQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>('http://localhost:51587/api/Users/getQuestions');
  }
  AddQuestion(question: Question) {
    console.log('it works');
    return this.http.post('http://localhost:51587/api/Users/AddQuestion', question).subscribe();
  }
  AddAnswer(answer: Answer) {
    return this.http.post('http://localhost:51587/api/Users/AddAnswer', answer).subscribe();
  }
}

