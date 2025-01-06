import { Component, inject, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
	selector: 'app-messages',
	standalone: true,
	imports: [],
	templateUrl: './messages.component.html',
	styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
	msgService = inject(MessagesService);
	pgNumber = 1;
	pgSize = 5;
	container = 'outbox';

	ngOnInit(): void {
		this.getMessages();
	}

	getMessages(): void {
		this.msgService.getMessages(this.pgNumber, this.pgSize, this.container);
	}

	onPageChanged(event: PageChangedEvent): void {
		if (this.pgNumber !== event.page) {
			this.pgNumber = event.page;
			this.getMessages();
		}
	}
}
