import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-member-list',
	standalone: true,
	imports: [MemberCardComponent, PaginationModule, FormsModule],
	templateUrl: './member-list.component.html',
	styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
	memberService = inject(MemberService);
	triggerReload = false;

	ngOnInit(): void {
		console.log(this.memberService.paginatedMembers());
		this.loadMembers();
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

	reloadMembers(event: boolean): void {
		this.triggerReload = event;
		if (this.triggerReload) {
			this.loadMembers();
			console.log('triggered');
		}
		this.triggerReload = false;
	}
}
