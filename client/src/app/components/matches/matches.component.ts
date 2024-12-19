import { Component, inject, OnInit } from '@angular/core';
import { LikesService } from '../../services/likes.service';

@Component({
	selector: 'app-matches',
	standalone: true,
	imports: [],
	templateUrl: './matches.component.html',
	styleUrl: './matches.component.css',
})
export class MatchesComponent implements OnInit {
	private likesService = inject(LikesService);

	ngOnInit(): void {}

	loadMatches() {}
}
