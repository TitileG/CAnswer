import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { Collaborator } from 'src/app/_models/collaborators';
import { CollobaratorsService } from "src/app/_services/collobarators.service";  
import { User } from '@app/_models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})

  
  export class CollaboratorComponent implements OnInit {  
    dataSaved = false;  
    collaboratorForm: any;  
    allcollaborators: Observable<Collaborator[]>;
    collaborator: Collaborator;
    colablist :Collaborator[];  
    collaboratorIdUpdate = null;  
    massage = null; 
    show = false; 
  
  constructor(private formbuilder: FormBuilder, private collaboratorService:CollobaratorsService,   private route: ActivatedRoute,
        private router: Router) { }  
  
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
    if(this.allcollaborators != null){
        this.show = true;
        console.log(this.show); 
    } 
  }  


    
  resetForm() {  
    this.collaboratorForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }  
} 
  


