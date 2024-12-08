import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { MemberService } from '../../../services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
	selector: 'app-member-list',
	standalone: true,
	imports: [MemberCardComponent],
	templateUrl: './member-list.component.html',
	styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
	memberService = inject(MemberService);

	ngOnInit(): void {
		if (this.memberService.members().length === 0) this.loadMembers();
	}

	loadMembers(): void {
		this.memberService.getMembers();
	}
}
