import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl = environment.apiUrl;

  getUser(id: number): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + 'users/' + id, this.getToken());
  }

  getUsers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + 'users', this.getToken());
  }

  getToken(): {
    headers: HttpHeaders;
  } {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.accountService.currentUser()?.token,
      }),
    };
  }
}
