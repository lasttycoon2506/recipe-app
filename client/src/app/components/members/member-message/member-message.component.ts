import { Component, inject, input, OnInit } from '@angular/core';
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
export class MemberMessageComponent implements OnInit {
	username = input<string>('');
	msgThread = input<Message[] | null>(null);

	ngOnInit(): void {}
}
