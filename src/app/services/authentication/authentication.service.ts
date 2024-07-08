import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_endpoints } from '../../constants/apiEndPoints';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  loginUser(user: User): Observable<any> {
    return this.http.post(api_endpoints.api + api_endpoints.login, user);
  }

  register(user: User): Observable<any> {
    return this.http.post(api_endpoints.api + api_endpoints.signin, user, { responseType: 'text' });
  }

  refreshLogin(token: string): Observable<any> {
    return this.http.post(api_endpoints.api + api_endpoints.refresh, `\"${token}\"`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
}
