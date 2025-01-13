import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	private baseUrl = environment.apiUrl;
	private http = inject(HttpClient);

	getUsersWithRoles(): Observable<User[]> {
		return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles');
	}
}
