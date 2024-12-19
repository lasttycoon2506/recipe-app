import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';

@Injectable({
	providedIn: 'root',
})
export class LikesService {
	whoUserLikesIds = signal<number[]>([]);
	http = inject(HttpClient);
	baseUrl = environment.apiUrl;

	toggleLike(targetUserId: number): void {
		this.http.post(this.baseUrl + 'likes/' + targetUserId, {});
	}

	getLikes(predicate: string) {
		this.http.get<Member[]>(
			this.baseUrl + 'likes/list?predicate=' + predicate,
		);
	}

	getWhoUserLikesIds() {
		this.http.get<number[]>(this.baseUrl + 'likes/list-ids').subscribe({
			next: (ids) => this.whoUserLikesIds.set(ids),
		});
	}
}
