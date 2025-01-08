import { Component, inject, input, output, ViewChild } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';
import { Message } from '../../../models/message';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
	selector: 'app-member-message',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './member-message.component.html',
	styleUrl: './member-message.component.css',
})
export class MemberMessageComponent {
	@ViewChild('msgForm') msgForm?: NgForm;
	private msgService = inject(MessagesService);
	username = input<string>('');
	msgThread = input<Message[] | null>(null);
	msgContent = '';
	newMsg = output<Message>();

	sendMsg(): void {
		this.msgService
			.sendMessage(this.username(), this.msgContent)
			.subscribe({
				next: (postedMsg) => {
					this.newMsg.emit(postedMsg), this.msgForm?.reset();
				},
			});
	}

	deleteMsg() {}
}
