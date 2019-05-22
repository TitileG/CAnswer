import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { Collaborator } from 'src/app/_models/collaborators';
import { CollobaratorsService } from "src/app/_services/collobarators.service";  

@Component({
  selector: 'app-add-collab',
  templateUrl: './add-collab.component.html',
  styleUrls: ['./add-collab.component.css']
})
export class AddCollabComponent implements OnInit {
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

  Createcollaborator(collaborator: Collaborator) {  
    if (this.collaboratorIdUpdate == null) {  
      this.collaboratorService.AddCollaborators(collaborator).subscribe(  
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

