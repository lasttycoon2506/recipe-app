import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getUser(id: number): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + 'users/' + id);
  }

  getUsers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }
}
