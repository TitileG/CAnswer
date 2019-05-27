import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { AddCollaborator } from 'src/app/_models/AddCollaborator';
import { CollobaratorsService } from "src/app/_services/collobarators.service";  
import { Collaborator, User } from '@app/_models';

@Component({
  selector: 'app-add-collab',
  templateUrl: './add-collab.component.html',
  styleUrls: ['./add-collab.component.css']
})
export class AddCollabComponent implements OnInit {
  dataSaved = false;  
  // collaboratorForm: any;
  addcol: AddCollaborator; 
  collaboratorIdUpdate = null;
  collaboratoradded: Collaborator;
  useradded: User; 
  massage = null; 
  show = false; 

  constructor(private formbuilder: FormBuilder, private collaboratorService:CollobaratorsService) { }  
  collaboratorForm = new FormGroup({  
    name: new FormControl(''), //['', [Validators.required]],  
    surname: new FormControl(''),// ['', [Validators.required]],  
    email: new FormControl(''),// ['', [Validators.required]],  
    username:new FormControl(''),//  ['', [Validators.required]],  
    phoneNo:new FormControl(''),//  ['', [Validators.required]],  
    jobDescription:new FormControl(''),//  ['', [Validators.required]], 
    Qualification:new FormControl(''),
    password:new FormControl('')
  });
  ngOnInit() {
    
  }

  Createcollaborator(collaborator: AddCollaborator) { 
    console.log(this.collaboratorForm.controls['name'].value+ "hello");
    this.addcol = new AddCollaborator();
    this.collaboratoradded = new Collaborator();
    this.useradded = new User();
    this.collaboratoradded.Name =  this.collaboratorForm.controls['name'].value;
    this.collaboratoradded.Surname = this.collaboratorForm.controls['surname'].value;
    // this.collaboratoradded.email_address = 
    this.collaboratoradded.Phone_number =this.collaboratorForm.controls['phoneNo'].value;
    this.collaboratoradded.Job_Depscription =  this.collaboratorForm.controls['jobDescription'].value;
    this.collaboratoradded.Qualification = this.collaboratorForm.controls['Qualification'].value;
    //this is where we store
    this.useradded.email_address = this.collaboratorForm.controls['email'].value;
    this.useradded.Username = this.collaboratorForm.controls['username'].value;
    this.useradded.password = this.collaboratorForm.controls['password'].value;
    this.useradded.usertypeID = 3;
    this.addcol.getcolab = this.collaboratoradded;
    this.addcol.getusers = this.useradded;
    console.log(this.addcol);
    if (this.collaboratorIdUpdate == null) {  
      this.collaboratorService.AddCollaborators(this.addcol).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.collaboratorIdUpdate = null;  
          this.collaboratorForm.reset();  
        }  
      );  
      }

    }
    onFormSubmit() {  
      this.dataSaved = false;  
      const collaborator = this.collaboratorForm.value;  
      this.Createcollaborator(collaborator);  
      this.collaboratorForm.reset();  
    }  
    
  }

