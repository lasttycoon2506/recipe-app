import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationResult } from '../models/pagination';
import { Message } from '../models/message';
import {
	setPaginatedResponse,
	setPaginationHeader,
} from '../helpers/paginationHelper';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MessagesService {
	private baseUrl = environment.apiUrl;
	private httpClient = inject(HttpClient);
	paginatedMessages = signal<PaginationResult<Message[]> | null>(null);

	getMessages(pgNumber: number, pgSize: number, container: string): void {
		let params = setPaginationHeader(pgNumber, pgSize);
		params = params.append('container', container);

		this.httpClient
			.get<Message[]>(this.baseUrl + 'message', {
				observe: 'response',
				params,
			})
			.subscribe({
				next: (res) =>
					setPaginatedResponse(res, this.paginatedMessages),
			});
	}

	getMessageThread(targetUserName: string): Observable<Message[]> {
		return this.httpClient.get<Message[]>(
			`${this.baseUrl}message/${targetUserName}`,
		);
	}
}
