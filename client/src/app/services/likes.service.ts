import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';
import { PaginationResult } from '../models/pagination';
import { setPaginatedResponse, setPaginationHeader } from './paginationHelper';
import { UserParams } from '../models/userParams';

@Injectable({
	providedIn: 'root',
})
export class LikesService {
	http = inject(HttpClient);
	baseUrl = environment.apiUrl;
	whoUserLikesIds = signal<number[]>([]);
	paginatedMatchedMembers = signal<PaginationResult<Member[]> | null>(null);

	like(targetUserId: number): void {
		this.http
			.post<Response>(this.baseUrl + 'likes/' + targetUserId, {})
			.subscribe({
				next: () =>
					this.whoUserLikesIds.update(() => [
						...this.whoUserLikesIds(),
						targetUserId,
					]),
			});
	}

	getMatches(userParams: UserParams): void {
		if (userParams) {
			setPaginationHeader(userParams);
		}

		this.http
			.get<HttpResponse<Member[]>>(this.baseUrl + 'likes/list-matches')
			.subscribe({
				next: (response) =>
					setPaginatedResponse(
						response,
						this.paginatedMatchedMembers,
					),
			});
	}

	getWhoUserLikesIds(): void {
		this.http
			.get<number[]>(this.baseUrl + 'likes/list-like-ids')
			.subscribe({
				next: (ids) => this.whoUserLikesIds.set(ids),
			});
	}
}
