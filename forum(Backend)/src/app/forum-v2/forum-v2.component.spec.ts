import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumV2Component } from './forum-v2.component';

describe('ForumV2Component', () => {
  let component: ForumV2Component;
  let fixture: ComponentFixture<ForumV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
