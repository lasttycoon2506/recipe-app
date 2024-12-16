import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
	selector: 'app-member-list',
	standalone: true,
	imports: [MemberCardComponent, PaginationModule],
	templateUrl: './member-list.component.html',
	styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
	memberService = inject(MemberService);
	pgNumber = 1;
	pgSize = 5;

	ngOnInit(): void {
		if (!this.memberService.paginatedMembers()) this.loadMembers();
	}

	loadMembers(): void {
		this.memberService.getMembers(this.pgNumber, this.pgSize);
	}

	onPageChanged(event: PageChangedEvent): void {
		this.pgNumber = event.page;
		this.loadMembers();
	}
}
