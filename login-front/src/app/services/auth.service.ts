import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Auth } from '../models/auth-model';
import { LogAuth } from '../models/log-model';

const url = 'http://localhost:3000/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signupUser(body): Observable<Auth> {
    return this.http.post<Auth>(`${url}/signup`, body);
  }

  loginUser(body): Observable<LogAuth> {
    return this.http.post<LogAuth>(`${url}/login`, body);
  }

  getUsers(): Observable<any>{
    return this.http.get(`${url}/get-users`);
  }
}
