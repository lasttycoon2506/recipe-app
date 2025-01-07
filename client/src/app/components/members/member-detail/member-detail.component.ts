import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DatePipe } from '@angular/common';
import { MessagesService } from '../../../services/messages.service';

@Component({
	selector: 'app-member-detail',
	standalone: true,
	imports: [TabsModule, DatePipe],
	templateUrl: './member-detail.component.html',
	styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
	private route = inject(ActivatedRoute);
	private memberService = inject(MemberService);
	msgService = inject(MessagesService);
	member?: Member;

	ngOnInit(): void {
		this.loadMember();
		this.loadMsgThread();
	}

	loadMember(): void {
		const username = this.route.snapshot.paramMap.get('username');
		if (!username) return;
		this.memberService.getMember(username).subscribe({
			next: (member) => (this.member = member),
			error: (err) => console.log(err),
		});
	}

	loadMsgThread(): void {
		this.msgService.getMessageThread(this.member!.username);
	}
}
