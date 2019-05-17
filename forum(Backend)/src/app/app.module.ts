import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumComponent } from './forum/forum.component';
import { ForumV2Component } from './forum-v2/forum-v2.component';
import { ForumNavComponent } from './forum-nav/forum-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionforumComponent } from './questionforum/questionforum.component';
import { HttpClientModule } from '@angular/common/http';
import { PostUpdateComponent } from './post-update/post-update.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    ForumV2Component,
    ForumNavComponent,
    QuestionforumComponent,
    PostUpdateComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
