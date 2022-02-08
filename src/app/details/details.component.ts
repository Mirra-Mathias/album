import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../post.service';
import { Card } from '../types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	card?: Card;

	constructor(
		private route: ActivatedRoute,
		private postService: PostService
	) { }

	async ngOnInit(): Promise<void> {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.card = await this.postService.getPost(id);
	}
}
