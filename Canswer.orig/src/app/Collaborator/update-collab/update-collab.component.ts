import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
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
  collaboratorForm: any;  

  collaboratorIdUpdate = null;  
  collabID :number;
  addcollaborator: AddCollaborator = null;

  constructor(  private router: Router,
    private route: ActivatedRoute,private formbuilder: FormBuilder, private collaboratorService:CollobaratorsService) { }  

  ngOnInit() {
    this.collaboratorForm = this.formbuilder.group({  
      name: ['', [Validators.required]],  
      surname: ['', [Validators.required]],  
      email: ['', [Validators.required]],  
      username: ['', [Validators.required]],  
      phoneNo: ['', [Validators.required]],  
      jobDescription: ['', [Validators.required]], 
      qualification: ['', [Validators.required]], 

    });


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
    this.collaboratorForm.controls['email'].setValue(addCollaborator.getusers.email_address);
     this.collaboratorForm.controls['phoneNo'].setValue(addCollaborator.getcolab.Phone_number);  
     this.collaboratorForm.controls['jobDescription'].setValue(addCollaborator.getcolab.Job_Depscription);
    this.collaboratorForm.controls['qualification'].setValue(addCollaborator.getcolab.Qualification);

    console.log("Phase 3");
});
}

  updateCollaborator(collaborator: AddCollaborator){
  
  this.collaboratorService.updateCollaborators(collaborator).subscribe(() => {  
      this.dataSaved = true;  


  });
}
  
     onFormSubmit() {  
       console.log("Phase 4 ")
      this.dataSaved = false;  
      const collaborator = this.collaboratorForm.value;  
      this.updateCollaborator(collaborator);  
      this.collaboratorForm.reset();  
    
    }  
    
  }



