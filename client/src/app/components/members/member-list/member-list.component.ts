import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { LikesService } from '../../../services/likes.service';

@Component({
	selector: 'app-member-list',
	standalone: true,
	imports: [MemberCardComponent, PaginationModule, FormsModule],
	templateUrl: './member-list.component.html',
	styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
	memberService = inject(MemberService);
	private likesService = inject(LikesService);

	ngOnInit(): void {
		this.loadMembers();
		this.likesService.getWhoUserLikesIds();
	}

	loadMembers(): void {
		this.memberService.getMembers();
	}

	onPageChanged(event: PageChangedEvent): void {
		this.memberService.userParams().pgNumber = event.page;
		this.loadMembers();
	}

	resetFilter(): void {
		this.memberService.resetUserParams();
		this.loadMembers();
	}
}
