import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { MemberService } from '../../../services/member.service';

@Component({
	selector: 'app-member-edit',
	standalone: true,
	imports: [],
	templateUrl: './member-edit.component.html',
	styleUrl: './member-edit.component.css',
})
export class MemberEditComponent implements OnInit {
	private accountService = inject(AccountService);
	private memberService = inject(MemberService);

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	loadMember(): void {
		var user = this.accountService.currentUser();
		this.memberService.getMember();
	}
}
