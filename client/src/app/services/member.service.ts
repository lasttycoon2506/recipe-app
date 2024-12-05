import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
	providedIn: 'root',
})
export class MemberService {
	private http = inject(HttpClient);
	private baseUrl = environment.apiUrl;

	getMember(username: string): Observable<Member> {
		return this.http.get<Member>(this.baseUrl + 'users/' + username);
	}

	getMembers(): Observable<Member[]> {
		return this.http.get<Member[]>(this.baseUrl + 'users');
	}
}
