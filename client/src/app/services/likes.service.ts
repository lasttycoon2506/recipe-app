import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LikesService {
	matches = signal<Member[]>([]);
	http = inject(HttpClient);
	baseUrl = environment.apiUrl;

	like(targetUserId: number): Observable<Response> {
		return this.http.post<Response>(
			this.baseUrl + 'likes/' + targetUserId,
			{},
		);
	}

	getMatches(): void {
		this.http.get<Member[]>(this.baseUrl + 'likes/list-matches').subscribe({
			next: (matches) => this.matches.set(matches),
		});
	}

	getWhoUserLikesIds() {
		return this.http.get<number[]>(this.baseUrl + 'likes/list-like-ids');
	}
}
