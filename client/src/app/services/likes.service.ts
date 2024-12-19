import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';
import { Observable, Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LikesService {
	whoUserLikesIds = signal<number[]>([]);
	http = inject(HttpClient);
	baseUrl = environment.apiUrl;

	toggleLike(targetUserId: number): Observable<Response> {
		return this.http.post<Response>(
			this.baseUrl + 'likes/' + targetUserId,
			{},
		);
	}

	getLikes(predicate: string): Observable<Member[]> {
		return this.http.get<Member[]>(
			this.baseUrl + 'likes/list?predicate=' + predicate,
		);
	}

	getWhoUserLikesIds(): Subscription {
		return this.http
			.get<number[]>(this.baseUrl + 'likes/list-ids')
			.subscribe({
				next: (ids) => this.whoUserLikesIds.set(ids),
			});
	}
}
