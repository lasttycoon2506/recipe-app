import { Component, inject, OnInit } from '@angular/core';
import { LikesService } from '../../services/likes.service';
import { Member } from '../../models/member';

@Component({
	selector: 'app-matches',
	standalone: true,
	imports: [],
	templateUrl: './matches.component.html',
	styleUrl: './matches.component.css',
})
export class MatchesComponent implements OnInit {
	private likesService = inject(LikesService);
	matches: Member[] = [];

	ngOnInit(): void {}

	loadMatches() {
		this.likesService.getMatches();
	}
}
