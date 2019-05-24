import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import {ForumComponent} from './forum/forum.component';
import {UpdatesComponent} from './updates/updates.component';
import { AuthGuard } from './_guards';
import {CollaboratorComponent} from './Collaborator/collaborator/collaborator.component';
import { ForumNavComponent } from './forum/Add-Question/forum-nav.component';
import { ForumV2Component} from './forum/Add-Answer/forum-v2.component';
import {QuestionForumComponent} from './forum/Forum/question-forum.component';
import { AddCollabComponent } from './Collaborator/add-collab/add-collab.component';
import {UpdateCollabComponent} from './Collaborator/update-collab/update-collab.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path : 'about', component : AboutComponent},
    {path: 'updates', component : UpdatesComponent},
    {path: 'forum', component : ForumComponent},
    {path: 'account', component: AccountComponent},
    {path: 'register' , component: RegisterComponent},
    {path: 'Collaborators', component: CollaboratorComponent},
    {path : 'addquestion', component: ForumNavComponent},
    { path: 'answer/:id', component: ForumV2Component },
    { path: 'question', component: QuestionForumComponent },
    {path: 'AddCollaborator', component: AddCollabComponent},
    {path: 'UpdateCollaborator/:id', component: UpdateCollabComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
