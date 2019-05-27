import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { Collaborator } from 'src/app/_models/collaborators';
import{AddCollaborator} from 'src/app/_models/AddCollaborator';
import { CollobaratorsService } from "src/app/_services/collobarators.service";  
import {Router ,ActivatedRoute} from '@angular/router';
import { User } from '@app/_models';

@Component({
  selector: 'app-update-collab',
  templateUrl: './update-collab.component.html',
  styleUrls: ['./update-collab.component.css']
})
export class UpdateCollabComponent implements OnInit {

  dataSaved = false;
  collaboratorIdUpdate = null;  
  collabID : number;
  addcollaborator: AddCollaborator;
  collaboratoradded: Collaborator;
  useradded: User; 
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
  constructor(  private router: Router,
    private route: ActivatedRoute,private formbuilder: FormBuilder, private collaboratorService:CollobaratorsService) { }  

  ngOnInit() {
     this.collabID = +this.route.snapshot.params['id'];
    console.log("Phase1");
   console.log(this.collabID);
   
  this.CollaboratorToEdit()
    }

    CollaboratorToEdit(){
      this.collaboratorService.getCollaboratorById(this.collabID).subscribe
   (addCollaborator => {
  
    console.log(addCollaborator.getcolab.Name);
    
    
     this.collaboratorForm.controls['name'].setValue(addCollaborator.getcolab.Name);
    this.collaboratorForm.controls['surname'].setValue(addCollaborator.getcolab.Surname);
    this.collaboratorForm.controls['username'].setValue(addCollaborator.getusers.Username);
    this.collaboratorForm.controls['email'].setValue(addCollaborator.getusers.email_address);
     this.collaboratorForm.controls['phoneNo'].setValue(addCollaborator.getcolab.Phone_number);  
     this.collaboratorForm.controls['jobDescription'].setValue(addCollaborator.getcolab.Job_Depscription);
    this.collaboratorForm.controls['Qualification'].setValue(addCollaborator.getcolab.Qualification);

    console.log("Phase 3");
});
}


     onFormSubmit() {  
      this.dataSaved = false; 
    
    this.addcollaborator = new AddCollaborator();
    this.collaboratoradded = new Collaborator();
    this.useradded = new User();
    this.collaboratoradded.ID = this.collabID; 
    this.collaboratoradded.Name =  this.collaboratorForm.controls['name'].value;
    this.collaboratoradded.Surname = this.collaboratorForm.controls['surname'].value;
    // this.collaboratoradded.email_address = 
    this.collaboratoradded.Phone_number =this.collaboratorForm.controls['phoneNo'].value;
    this.collaboratoradded.Job_Depscription =  this.collaboratorForm.controls['jobDescription'].value;
    this.collaboratoradded.Qualification = this.collaboratorForm.controls['Qualification'].value;
    console.log(this.collaboratoradded);
    //this is where we store
    this.useradded.email_address = this.collaboratorForm.controls['email'].value;
    this.useradded.Username = this.collaboratorForm.controls['username'].value;
    this.addcollaborator.getcolab = this.collaboratoradded;
    this.addcollaborator.getusers = this.useradded;

    this.collaboratorService.updateCollaborators(this.addcollaborator).subscribe(() => {  
      this.dataSaved = true;  
      this.router.navigate["/Collaborators"]; 
      console.log("Phase 5")
      console.log(this.addcollaborator);
      this.collaboratorForm.reset(); 

      console.log("Phase 4 ");
    
    },)
    
  }
}



