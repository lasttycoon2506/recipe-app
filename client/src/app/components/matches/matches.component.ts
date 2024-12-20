import { Component, inject, OnInit } from '@angular/core';
import { LikesService } from '../../services/likes.service';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
	selector: 'app-matches',
	standalone: true,
	imports: [MemberCardComponent, PaginationModule],
	templateUrl: './matches.component.html',
	styleUrl: './matches.component.css',
})
export class MatchesComponent implements OnInit {
	likesService = inject(LikesService);
	currentPg = 1;

	ngOnInit(): void {
		this.loadMatches();
	}

	loadMatches() {
		this.likesService.getMatches();
	}

	onPageChanged(event: PageChangedEvent) {
		if (this.currentPg !== event.page) this.loadMatches();
		this.currentPg = event.page;
	}
}
