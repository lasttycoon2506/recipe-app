import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-member-list',
	standalone: true,
	imports: [MemberCardComponent, PaginationModule, FormsModule],
	templateUrl: './member-list.component.html',
	styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
	memberService = inject(MemberService);

	ngOnInit(): void {
		this.loadMembers();
	}

	loadMembers(): void {
		console.log(this.memberService.paginatedMembers());
		this.memberService.getMembers();
		console.log(this.memberService.paginatedMembers());
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
