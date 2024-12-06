import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
	selector: 'app-member-edit',
	standalone: true,
	imports: [TabsModule],
	templateUrl: './member-edit.component.html',
	styleUrl: './member-edit.component.css',
})
export class MemberEditComponent implements OnInit {
	private accountService = inject(AccountService);
	private memberService = inject(MemberService);
	member?: Member;

	ngOnInit(): void {
		this.loadMember();
	}

	loadMember(): void {
		var username = this.accountService.currentUser()?.username;
		if (!username) return;
		this.memberService.getMember(username).subscribe({
			next: (member) => (this.member = member),
			error: (err) => console.log(err),
		});
	}
}
