import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL: string = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/signup`, user);
  }

  signin(user: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/signin`, user);
  }
  isAuthenticated() {
    return JSON.parse(localStorage.getItem('user')!) || null;
  }

  users(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URL}/users`);
  }

  usersDelete(id: string): Observable<any>{
    return this.http.delete<any>(`${this.API_URL}/users/${id}`);
  }

  user(id:string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/users/${id}`);
  }

  updateUser(data: any): Observable<any> {
    const url = `${this.API_URL}/users/${data.id}`;
    return this.http.put(url, data);
  }
  

  logout() {
    localStorage.removeItem('user');
  }
}