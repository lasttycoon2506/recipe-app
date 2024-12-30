import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Member } from '../models/member';
import { Photo } from '../models/photo';
import { PaginationResult } from '../models/pagination';
import { UserParams } from '../models/userParams';
import {
	setPaginatedResponse,
	setPaginationHeader,
} from '../helpers/paginationHelper';

@Injectable({
	providedIn: 'root',
})
export class MemberService {
	private http = inject(HttpClient);
	private baseUrl = environment.apiUrl;
	paginatedMembers = signal<PaginationResult<Member[]> | null>(null);
	userParams = signal<UserParams>(new UserParams());

	getMember(username: string): Observable<Member> {
		const member = this.paginatedMembers
			? this.paginatedMembers()?.items.find(
					(m) => m.username === username,
				)
			: null;

		if (member) return of(member);
		return this.http.get<Member>(this.baseUrl + 'users/' + username);
	}

	getMembers(): void {
		let params = setPaginationHeader(
			this.userParams().pgNumber,
			this.userParams().pgSize,
			this.userParams().specialty,
			this.userParams().experience,
		);

		this.http
			.get<
				Member[]
			>(this.baseUrl + 'users', { observe: 'response', params })
			.subscribe({
				next: (response) =>
					setPaginatedResponse(response, this.paginatedMembers),
			});
	}

	updateMember(member: Member): Observable<Response> {
		return this.http.put<Response>(this.baseUrl + 'users', member);
	}

	setMainPic(photo: Photo): Observable<Response> {
		return this.http.put<Response>(
			this.baseUrl + 'users/set-main-pic/' + photo.id,
			{},
		);
	}

	deletePic(photo: Photo): Observable<Response> {
		return this.http.delete<Response>(
			this.baseUrl + 'users/delete-pic/' + photo.id,
		);
	}

	resetUserParams(): void {
		this.userParams.set(new UserParams());
	}
}
