import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { Collaborator } from 'src/app/_models/collaborators';
import { CollobaratorsService } from "src/app/_services/collobarators.service";  

@Component({
  selector: 'app-update-collab',
  templateUrl: './update-collab.component.html',
  styleUrls: ['./update-collab.component.css']
})
export class UpdateCollabComponent implements OnInit {

  dataSaved = false;  
  collaboratorForm: any;  
  allcollaborators: Observable<Collaborator[]>;
  colablist :Collaborator[];  
  collaboratorIdUpdate = null;  
  massage = null; 
  show = false; 

  constructor(private formbuilder: FormBuilder, private collaboratorService:CollobaratorsService) { }  

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
  }
  collaboratorToEdit(collaboratorId: string) {  
    this.collaboratorService.getCollaboratorById(collaboratorId).subscribe(collaborator=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.collaboratorIdUpdate = collaborator.ID;  
      this.collaboratorForm.controls['name'].setValue(collaborator.Name);  
     this.collaboratorForm.controls['surname'].setValue(collaborator.Surname); 
      this.collaboratorForm.controls['phoneNo'].setValue(collaborator.Phone_number);  
      this.collaboratorForm.controls['jobDescription'].setValue(collaborator.Job_Depscription);
      this.collaboratorForm.controls['qualification'].setValue(collaborator.Qualification);  
    });  
  
  } 
  updateCollaborator(collaborator: Collaborator){
    collaborator.ID = this.collaboratorIdUpdate;  
    this.collaboratorService.updateCollaborators(collaborator).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Updated Successfully';  
  });
}
  

     onFormSubmit() {  
      this.dataSaved = false;  
      const collaborator = this.collaboratorForm.value;  
      this.updateCollaborator(collaborator);  
      this.collaboratorForm.reset();  
      this.collaboratorIdUpdate = null;  
    }  
    
  }



