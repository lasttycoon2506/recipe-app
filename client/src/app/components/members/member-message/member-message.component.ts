import { Component, inject, input, output } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';
import { Message } from '../../../models/message';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-member-message',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './member-message.component.html',
	styleUrl: './member-message.component.css',
})
export class MemberMessageComponent {
	private msgService = inject(MessagesService);
	username = input<string>('');
	msgThread = input<Message[] | null>(null);
	msgContent = '';
	newMsg = output<Message>();

	sendMsg() {
		this.msgService
			.sendMessage(this.username(), this.msgContent)
			.subscribe({
				next: (postedMsg) => this.newMsg.emit(postedMsg),
			});
	}
}
