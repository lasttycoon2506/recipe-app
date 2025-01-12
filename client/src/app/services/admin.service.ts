import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	private baseUrl = environment;
	private http = inject(HttpClient);

	getMembersWithRoles(): Observable<Member[]> {
		return this.http.get<Member[]>(this.baseUrl + 'admin/users-with-roles');
	}
}
