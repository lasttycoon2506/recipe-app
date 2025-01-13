import {
	AfterViewChecked,
	Component,
	inject,
	input,
	output,
	ViewChild,
} from '@angular/core';
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
export class MemberMessageComponent implements AfterViewChecked {
	@ViewChild('msgForm') msgForm?: NgForm;
	@ViewChild('scrollMsgs') scrollMsgContainer: any;
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
		this.scrollBottom();
	}

	ngAfterViewChecked(): void {
		this.scrollBottom();
	}

	scrollBottom(): void {
		if (this.scrollMsgContainer) {
			this.scrollMsgContainer.nativeElement.scrollTop =
				this.scrollMsgContainer.nativeElement.scrollHeight;
		}
	}
}
