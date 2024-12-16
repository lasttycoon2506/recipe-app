import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Member } from '../models/member';
import { Photo } from '../models/photo';
import { PaginationResult } from '../models/pagination';
import { UserParams } from '../models/userParams';

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

	getMembers(userParams: UserParams): void {
		var params = this.setUserParams(userParams);

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

	private setUserParams(userParams: UserParams): HttpParams {
		let params = new HttpParams();

		params = params.append('pgNumber', userParams.pgNumber);
		params = params.append('pgSize', userParams.pgSize);
		if (userParams.specialty) {
			params = params.append('specialty', userParams.specialty);
		}
		if (userParams.experience) {
			params = params.append('experience', userParams.experience);
		}

		return params;
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
