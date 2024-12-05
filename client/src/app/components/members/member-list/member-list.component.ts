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
	private memberService = inject(MemberService);
	members: Member[] = [];

	ngOnInit(): void {
		this.loadMembers();
	}

	loadMembers(): void {
		this.memberService.getMembers().subscribe({
			next: (members) => (this.members = members),
			error: (error) => console.log(error),
		});
	}
}
