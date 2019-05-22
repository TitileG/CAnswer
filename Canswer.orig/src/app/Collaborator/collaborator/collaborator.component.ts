import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { Collaborator } from 'src/app/_models/collaborators';
import { CollobaratorsService } from "src/app/_services/collobarators.service";  
import { User } from '@app/_models';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})

  
  export class CollaboratorComponent implements OnInit {  
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
    console.log(this.show);  
    this.loadAllcollaborators();

  }  
  loadAllcollaborators() {  
    this.allcollaborators = this.collaboratorService.getAllCollaborators();
    // this.collaboratorService.getAllCollaborators().subscribe(data => this.colablist = data );
    // console.log(this.colablist[1])
    if(this.allcollaborators != null){
        this.show = true;
        console.log(this.show); 
    } 
  }  
collaboratorToEdit(collaboratorId: string) {  
    this.collaboratorService.getCollaboratorById(collaboratorId).subscribe(collaborator=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.collaboratorIdUpdate = collaborator.ID;  
      this.collaboratorForm.controls['Name'].setValue(collaborator.Name);  
     this.collaboratorForm.controls['Surname'].setValue(collaborator.Surname);  
    
      this.collaboratorForm.controls['Phone_number'].setValue(collaborator.Phone_number);  
      this.collaboratorForm.controls['Job_description'].setValue(collaborator.Job_Depscription);
      this.collaboratorForm.controls['Qualification'].setValue(collaborator.Qualification);  
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
      collaborator.ID = this.collaboratorIdUpdate;  
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
  


