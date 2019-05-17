import { Component, OnInit } from '@angular/core';
import { Article } from '../_models/article';
import { PostService } from '../_services/post.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {
  loading = false;
  submitted = false;
  article: Article;
  selectedFile: File;
  errorMsg: string;
  today: Date;
  newArticleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    pic: new FormControl(''),
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pService: PostService, ) { }


  ngOnInit() {}

  onFileChanged(event) {
    this.selectedFile = event.target.files[0] as File;
    console.log(event);
  }

  get f() { return this.newArticleForm.controls; }

  Submit() {
    this.article = new Article();
    this.today = new Date();
    // console.log(this.f.title.value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.newArticleForm.invalid) {
      this.errorMsg = 'Title needed!';
      return;
    }

    this.loading = true;
    if (this.f.description.value) {
      this.article.description = this.f.description.value;
    }
    this.article.title = this.f.title.value;
    this.article.createDate = this.today;
    if (this.selectedFile) {
      this.article.pic = this.selectedFile;
    }
    console.log(this.article);
    this.pService.addPost(this.article);
    this.router.navigate(['home']);
  }
    // public imagePath;
    // imgURL: any;
    // public message: string;


    // preview(files) {
    //   if (files.length === 0)
    //     return;

    //   var mimeType = files[0].type;
    //   if (mimeType.match(/image\/*/) == null) {
    //     this.message = "Only images are supported.";
    //     return;
    //   }

    //   var reader = new FileReader();
    //   this.imagePath = files;
    //   reader.readAsDataURL(files[0]);
    //   reader.onload = (_event) => {
    //     this.imgURL = reader.result;
    //   }
    // }
}
