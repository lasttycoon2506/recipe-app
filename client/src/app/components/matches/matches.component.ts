import { Component, inject, OnInit } from '@angular/core';
import { LikesService } from '../../services/likes.service';
import { MemberCardComponent } from '../members/member-card/member-card.component';

@Component({
	selector: 'app-matches',
	standalone: true,
	imports: [MemberCardComponent],
	templateUrl: './matches.component.html',
	styleUrl: './matches.component.css',
})
export class MatchesComponent implements OnInit {
	likesService = inject(LikesService);

	ngOnInit(): void {
		this.loadMatches();
	}

	loadMatches() {
		this.likesService.getMatches();
	}
}
