import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthentificationService} from "../authentification.service";
import {first} from "rxjs/operators";
import {PostService} from "../post.service";

interface User {
  token: string;
  user : {
    id: number;
    login: string;
  }
}

@Component({
  selector: 'app-create-poste',
  templateUrl: './create-poste.component.html',
  styleUrls: ['./create-poste.component.css']
})
export class CreatePosteComponent implements OnInit {

  createForm = this.formBuilder.group({
    title : ['', Validators.required],
    description: ['', Validators.required],
    picture: ['', Validators.required]
  });
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';

  currentUser: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthentificationService,
    private postes: PostService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.currentUser = this.authenticationService.currentUserValue;
    }
  }

  ngOnInit() {


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm?.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createForm?.invalid) {
      return;
    }

    this.loading = true;

    this.postes.createPoste(this.f.title.value, this.f.description.value, this.f.picture.value)
      .then(() => {this.router.navigate([this.returnUrl]);},() => {})
  }

}
