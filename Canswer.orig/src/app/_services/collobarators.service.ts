import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Collaborator} from '../_models/collaborators';
import { AddCollaborator } from '@app/_models/AddCollaborator';


@Injectable({
  providedIn: 'root'
})
export class CollobaratorsService {
  url = 'http://localhost:51587/api/Users';

  constructor(private http: HttpClient) {}

  getAllCollaborators():Observable<Collaborator[]>{
      return this.http.get<Collaborator[]>
      (this.url+'/GetCollaborators');
     
    }

    getCollaboratorById(ID: number): Observable<AddCollaborator> {  
      console.log("Phase2");
      return this.http.get<AddCollaborator>(this.url + '/GetColloborator/' + ID);  
    
    } 


 AddCollaborators(collaborator: AddCollaborator): Observable<AddCollaborator>{
  //  const httpOptions = {headers: new HttpHeaders({'content-type':'application/json'})};
   return this.http.post<AddCollaborator>(
     this.url+'/AddCollaborator',
     collaborator);
   
 }

 updateCollaborators(collaborator:AddCollaborator): Observable<AddCollaborator>{
  const httpOptions ={headers: new HttpHeaders({'content-type':'application/json'})};
   return this.http.post<AddCollaborator>

   ( this.url+ '/UpdateCollaborator',collaborator,httpOptions)
 }
   }
