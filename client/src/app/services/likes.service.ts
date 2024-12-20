import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';

@Injectable({
	providedIn: 'root',
})
export class LikesService {
	matches = signal<Member[]>([]);
	http = inject(HttpClient);
	baseUrl = environment.apiUrl;
	whoUserLikesIds = signal<number[]>([]);

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
		this.http.get<Member[]>(this.baseUrl + 'likes/list-matches').subscribe({
			next: (matches) => this.matches.set(matches),
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
