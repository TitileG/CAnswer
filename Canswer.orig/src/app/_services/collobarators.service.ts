import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Collaborator} from '../_models/collaborators';


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

    getCollaboratorById(ID: string): Observable<Collaborator> {  
      return this.http.get<Collaborator>(this.url + '/GetCollaborators/' + ID);  
    } 


 AddCollaborators(collaborator: Collaborator): Observable<Collaborator>{
   const httpOptions = {headers: new HttpHeaders({'content-type':'application/json'})};
   return this.http.post<Collaborator>(
     this.url+'/AddCollaborators',
     collaborator,httpOptions);
   
 }

 updateCollaborators(collaborator:Collaborator): Observable<Collaborator>{
   const httpOptions ={headers: new HttpHeaders({'content-type':'application/json'})};
   return this.http.put<Collaborator>

   ( this.url+ '/UpdateCollaborators',collaborator,httpOptions)
 }
   }
