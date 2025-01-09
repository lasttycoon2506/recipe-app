import { Component, inject, input, output, ViewChild } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';
import { Message } from '../../../models/message';
import { FormsModule, NgForm } from '@angular/forms';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member';

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
	memberService = inject(MemberService);
	username = input<string>('');
	msgThread = input<Message[] | null>(null);
	msgContent = '';
	newMsg = output<Message>();
	member = input.required<Member>();

	sendMsg(): void {
		this.msgService
			.sendMessage(this.username(), this.msgContent)
			.subscribe({
				next: (postedMsg) => {
					this.newMsg.emit(postedMsg), this.msgForm?.reset();
				},
			});
	}
}
