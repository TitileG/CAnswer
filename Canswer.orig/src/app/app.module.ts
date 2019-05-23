import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
    MatIconModule,MatCardModule,MatTabsModule, MatListModule,MatMenuModule,MatFormFieldModule,MatInputModule} from '@angular/material';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import{ForumComponent} from './forum/forum.component';
import {UpdatesComponent} from './updates/updates.component';
import { CollaboratorComponent } from './Collaborator/collaborator/collaborator.component';
import { ForumNavComponent } from './forum/forum-nav/forum-nav.component';
import { ForumV2Component } from './forum/forum-v2/forum-v2.component';
import { QuestionForumComponent } from './forum/question-forum/question-forum.component';
import { AddCollabComponent } from './Collaborator/add-collab/add-collab.component';
import{UpdateCollabComponent} from './Collaborator/update-collab/update-collab.component';

@NgModule({
    imports: [
            BrowserModule,
            FormsModule,BrowserAnimationsModule,
            ReactiveFormsModule,
            HttpClientModule,
            routing,  
            MatCardModule,
            NgxYoutubePlayerModule,
            MatToolbarModule, 
            MatButtonModule, 
            MatSidenavModule,
            MatIconModule,
            MatListModule,
            MatMenuModule,
            MatFormFieldModule,
            MatInputModule,
            MatTabsModule
            
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AboutComponent ,
        AccountComponent ,
        ForumComponent,
        UpdatesComponent,
        AboutComponent,
        CollaboratorComponent, 
        ForumNavComponent ,
        ForumV2Component , 
        QuestionForumComponent , 
        AddCollabComponent,
        UpdateCollabComponent 
    ],
        
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }