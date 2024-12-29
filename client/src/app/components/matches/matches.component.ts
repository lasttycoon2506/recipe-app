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
	pgNumber = 1;
	pgSize = 10;

	ngOnInit(): void {
		this.loadMatches();
	}

	loadMatches() {
		this.likesService.getMatches(this.pgNumber, this.pgSize);
	}

	onPageChanged(event: PageChangedEvent) {
		if (this.pgNumber !== event.page) this.loadMatches();
		this.pgNumber = event.page;
	}
}
