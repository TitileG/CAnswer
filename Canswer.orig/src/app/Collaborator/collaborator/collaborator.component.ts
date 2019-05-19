import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { Collaborator } from 'src/app/_models/collaborators';
import { CollobaratorsService } from "src/app/_services/collobarators.service";  

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})

  
  export class CollaboratorComponent implements OnInit {  
    dataSaved = false;  
    collaboratorForm: any;  
    allcollaborators: Observable<Collaborator[]>;  
    collaboratorIdUpdate = null;  
    massage = null;  

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
    this.loadAllcollaborators();  
  }  
  loadAllcollaborators() {  
    this.allcollaborators = this.collaboratorService.getAllCollaborators();  
  }  
  onFormSubmit() {  
    this.dataSaved = false;  
    const collaborator = this.collaboratorForm.value;  
    this.Createcollaborator(collaborator);  
    this.collaboratorForm.reset();  
  }  
  loadcollaboratorToEdit(collaboratorId: string) {  
    this.collaboratorService.getCollaboratorById(collaboratorId).subscribe(collaborator=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.collaboratorIdUpdate = collaborator.Id;  
      this.collaboratorForm.controls['name'].setValue(collaborator.name);  
     this.collaboratorForm.controls['surname'].setValue(collaborator.surname);  
      this.collaboratorForm.controls['username'].setValue(collaborator.username);  
      this.collaboratorForm.controls['email'].setValue(collaborator.email);  
      this.collaboratorForm.controls['phoneNo'].setValue(collaborator.phoneNo);  
      this.collaboratorForm.controls['jobDescr'].setValue(collaborator.jobDescr);
      this.collaboratorForm.controls['qualification'].setValue(collaborator.qualification);  
    });  
  
  }  
  Createcollaborator(collaborator: Collaborator) {  
    if (this.collaboratorIdUpdate == null) {  
      this.collaboratorService.AddCollaborators(collaborator).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.loadAllcollaborators();  
          this.collaboratorIdUpdate = null;  
          this.collaboratorForm.reset();  
        }  
      );  
    } else {  
      collaborator.Id = this.collaboratorIdUpdate;  
      this.collaboratorService.updateCollaborators(collaborator).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadAllcollaborators();  
        this.collaboratorIdUpdate = null;  
        this.collaboratorForm.reset();  
      });  
    }  
  }   
    
  resetForm() {  
    this.collaboratorForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }  
} 
  


