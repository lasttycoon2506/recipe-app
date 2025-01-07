import { Component, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';
import { Message } from '../../../models/message';

@Component({
	selector: 'app-member-message',
	standalone: true,
	imports: [],
	templateUrl: './member-message.component.html',
	styleUrl: './member-message.component.css',
})
export class MemberMessageComponent implements OnInit {
	private msgService = inject(MessagesService);
	username = input<string>('');
	msgThread: Message[] = [];

	ngOnInit(): void {
		this.loadMsgThread();
	}

	loadMsgThread(): void {
		this.msgService
			.getMessageThread(this.username())
			.subscribe({ next: (msgThread) => (this.msgThread = msgThread) });
	}
}
