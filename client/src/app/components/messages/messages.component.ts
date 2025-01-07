import { Component, inject, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-messages',
	standalone: true,
	imports: [
		ButtonsModule,
		FormsModule,
		RouterLink,
		DatePipe,
		PaginationModule,
	],
	templateUrl: './messages.component.html',
	styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
	msgService = inject(MessagesService);
	pgNumber = 1;
	pgSize = 5;
	container = 'outbox';

	ngOnInit(): void {
		this.loadMessages();
	}

	loadMessages(): void {
		this.msgService.getMessages(this.pgNumber, this.pgSize, this.container);
	}

	onPageChanged(event: PageChangedEvent): void {
		if (this.pgNumber !== event.page) {
			this.pgNumber = event.page;
			this.loadMessages();
		}
	}

	getRoute(message: Message): string {
		if (this.container === 'inbox' || this.container === 'unread')
			return `/members/${message.senderUsername}`;
		else return `/members/${message.receiverUsername}`;
	}
}
