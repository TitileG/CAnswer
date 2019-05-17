import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { QuestionforumComponent } from './questionforum/questionforum.component';
import { ForumV2Component } from './forum-v2/forum-v2.component';
import { ForumNavComponent } from './forum-nav/forum-nav.component';
import { HomeComponent } from './home/home.component';
import { PostUpdateComponent } from './post-update/post-update.component';


const routes: Routes = [
  // { path: '', component: ForumNavComponent },
  { path: '', component: ForumComponent },
  { path: 'answer/:id', component: ForumV2Component },
  { path: 'question', component: QuestionforumComponent },
  { path: 'forum', component: ForumNavComponent },
  { path: 'home', component: HomeComponent},
  { path: 'postUpdate', component: PostUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
