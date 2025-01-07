import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../models/member';
import { TabDirective, TabsModule } from 'ngx-bootstrap/tabs';
import { DatePipe } from '@angular/common';
import { MemberMessageComponent } from '../member-message/member-message.component';
import { Message } from '../../../models/message';
import { MessagesService } from '../../../services/messages.service';

@Component({
	selector: 'app-member-detail',
	standalone: true,
	imports: [TabsModule, DatePipe, MemberMessageComponent],
	templateUrl: './member-detail.component.html',
	styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
	@ViewChild('memberTabs') memberTabs?: TabsModule;
	private route = inject(ActivatedRoute);
	private memberService = inject(MemberService);
	private msgService = inject(MessagesService);
	member?: Member;
	activeTab?: TabDirective;
	msgThread: Message[] = [];

	ngOnInit(): void {
		this.loadMember();
	}

	onActivateTab(data: Event): void {
		this.activeTab = data;
		if (
			this.activeTab?.heading === 'Messages' &&
			this.msgThread.length === 0
		) {
			this.msgService.getMessageThread(this.member!.username).subscribe({
				next: (msgThread) => (this.msgThread = msgThread),
			});
		}
	}

	loadMember(): void {
		const username = this.route.snapshot.paramMap.get('username');
		if (!username) return;
		this.memberService.getMember(username).subscribe({
			next: (member) => (this.member = member),
			error: (err) => console.log(err),
		});
	}
}
