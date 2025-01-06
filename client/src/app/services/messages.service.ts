import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationResult } from '../models/pagination';

@Injectable({
	providedIn: 'root',
})
export class MessagesService {
	private baseUrl = environment.apiUrl;
	private httpClient = inject(HttpClient);
	paginatedMessages = signal<PaginationResult<Message>>(null);
}
