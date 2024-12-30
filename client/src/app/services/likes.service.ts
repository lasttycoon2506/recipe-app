import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';
import { PaginationResult } from '../models/pagination';
import {
	setPaginatedResponse,
	setPaginationHeader,
} from '../helpers/paginationHelper';

@Injectable({
	providedIn: 'root',
})
export class LikesService {
	private http = inject(HttpClient);
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

	getMatches(pgNumber: number, pgSize: number): void {
		let params = setPaginationHeader(pgNumber, pgSize);

		this.http
			.get<
				Member[]
			>(this.baseUrl + 'likes/list-matches', { observe: 'response', params })
			.subscribe({
				next: (response) =>
					setPaginatedResponse(
						response,
						this.paginatedMatchedMembers,
					),
			});
	}

	// getWhoUserLikesIds(): void {
	// 	this.http
	// 		.get<number[]>(this.baseUrl + 'likes/list-like-ids')
	// 		.subscribe({
	// 			next: (ids) => this.whoUserLikesIds.set(ids),
	// 		});
	// }
}
