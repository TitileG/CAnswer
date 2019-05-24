import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionForumComponent } from './question-forum.component';

describe('QuestionForumComponent', () => {
  let component: QuestionForumComponent;
  let fixture: ComponentFixture<QuestionForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
