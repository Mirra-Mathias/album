import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { Card } from '../types';
import {AuthentificationService} from "../authentification.service";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {
	cards: Card[] = [];
  boolToken: Boolean = false;
	constructor(private postService: PostService, private authenticationService: AuthentificationService) { }

	async ngOnInit(): Promise<void> {
		this.cards = await this.postService.getAllPosts();
    console.log(this.cards)

    if(this.authenticationService.currentUserValue){
      this.boolToken = true
    }else {
      this.boolToken = false
    }
	}
}
