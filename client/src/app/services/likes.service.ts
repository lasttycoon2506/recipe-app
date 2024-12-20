import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';
import { MemberService } from './member.service';
import { PaginationResult } from '../models/pagination';

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

	getMatches(): void {
		this.http
			.get<
				PaginationResult<Member[]>
			>(this.baseUrl + 'likes/list-matches')
			.subscribe({
				next: (matches) => this.paginatedMatchedMembers.set(matches),
			});
	}

	getWhoUserLikesIds() {
		this.http
			.get<number[]>(this.baseUrl + 'likes/list-like-ids')
			.subscribe({
				next: (ids) => this.whoUserLikesIds.set(ids),
			});
	}
}
