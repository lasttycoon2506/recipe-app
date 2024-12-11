import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Member } from '../models/member';
import { Photo } from '../models/photo';

@Injectable({
	providedIn: 'root',
})
export class MemberService {
	private http = inject(HttpClient);
	private baseUrl = environment.apiUrl;
	members = signal<Member[]>([]);

	getMember(username: string) {
		const member = this.members().find((m) => m.username === username);
		if (member) return of(member);

		return this.http.get<Member>(this.baseUrl + 'users/' + username);
	}

	getMembers(): void {
		this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
			next: (members) => this.members.set(members),
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
}
