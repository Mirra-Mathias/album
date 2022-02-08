import { Component, OnInit, Input } from '@angular/core';

import { Card } from "../types";
import {AuthentificationService} from "../authentification.service";
import {PostService} from "../post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
	@Input() card!: Card;

	likes = 0;
	stateLike = false;
  boolToken: Boolean = false;
  returnUrl: string = "";
	constructor(private authenticationService: AuthentificationService,
              private posts : PostService,
              private router: Router,
              private route: ActivatedRoute) {

  }

	like() {
		this.stateLike = !this.stateLike;
		this.likes += this.stateLike ? 1 : -1;
	}

	ngOnInit(): void {
    if(this.authenticationService.currentUserValue){
      this.boolToken = true
    }else {
      this.boolToken = false
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

  delete(id: number) {
    this.posts.deletePoste(id).then(() => window.location.reload())
  }
}
