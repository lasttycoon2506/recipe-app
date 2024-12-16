import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Member } from '../models/member';
import { Photo } from '../models/photo';
import { Pagination, PaginationResult } from '../models/pagination';

@Injectable({
	providedIn: 'root',
})
export class MemberService {
	private http = inject(HttpClient);
	private baseUrl = environment.apiUrl;
	// members = signal<Member[]>([]);
	paginatedMembers = signal<PaginationResult<Member[]> | null>(null);

	getMember(username: string) {
		// const member = this.members().find((m) => m.username === username);
		// if (member) return of(member);
		// return this.http.get<Member>(this.baseUrl + 'users/' + username);
	}

	getMembers(pgNumber?: number, pgSize?: number): void {
		let params = new HttpParams();

		if (pgNumber && pgSize) {
			params = params.append('pgNumber', pgNumber);
			params = params.append('pgSize', pgSize);
		}
		this.http
			.get<
				Member[]
			>(this.baseUrl + 'users', { observe: 'response', params })
			.subscribe({
				next: (response) => {
					this.paginatedMembers.set({
						items: response.body as Member[],
						pagination: JSON.parse(
							response.headers.get('Pagination')!,
						),
					});
				},
			});
	}

	updateMember(member: Member): Observable<Response> {
		return this.http.put<Response>(this.baseUrl + 'users', member);
	}

	setMainPic(photo: Photo) {
		// return this.http
		// 	.put<Response>(this.baseUrl + 'users/set-main-pic/' + photo.id, {})
		// 	.pipe(
		// 		tap(() =>
		// 			this.members.update((members) =>
		// 				members.map((member) => {
		// 					if (member.photos.includes(photo)) {
		// 						member.photoUrl = photo.url;
		// 					}
		// 					return member;
		// 				}),
		// 			),
		// 		),
		// 	);
	}

	deletePic(photo: Photo) {
		// return this.http
		// 	.delete<Response>(this.baseUrl + 'users/delete-pic/' + photo.id)
		// 	.pipe(
		// 		tap(() =>
		// 			this.members.update((members) =>
		// 				members.map((member) => {
		// 					if (member.photos.includes(photo)) {
		// 						member.photos = member.photos.filter(
		// 							(pic) => pic.id !== photo.id,
		// 						);
		// 					}
		// 					return member;
		// 				}),
		// 			),
		// 		),
		// 	);
	}
}
