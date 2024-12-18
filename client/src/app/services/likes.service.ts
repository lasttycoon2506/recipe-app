import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

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

	getLikes() {}

	getWhoUserLikesIds() {}
}
