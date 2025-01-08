import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
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
	@ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
	private route = inject(ActivatedRoute);
	private msgService = inject(MessagesService);
	member: Member = {} as Member;
	activeTab?: TabDirective;
	msgThread: Message[] = [];

	ngOnInit(): void {
		this.route.data.subscribe({
			next: (data) => (this.member = data['member']),
		});

		this.route.queryParams.subscribe({
			next: (params) => {
				params['tab'] && this.selectTab(params['tab']);
			},
		});
	}

	onActivateTab(data: TabDirective): void {
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

	selectTab(header: string): void {
		if (this.memberTabs) {
			const msgTab = this.memberTabs.tabs.find(
				(tab) => tab.heading === header,
			);
			if (msgTab) msgTab.active = true;
		}
	}
}
