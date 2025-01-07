import { Component, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';

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

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	loadMsgThread(): void {
		this.msgService.getMessageThread(this.username()).subscribe({});
	}
}
