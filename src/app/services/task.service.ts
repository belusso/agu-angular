import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { API_URL } from '../../main';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {

  }

  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getTasks(): Observable<any> {
    return this.http.get<any[]>(`${API_URL}/tasks`, { headers: this.getHeaders() })
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/tasks/${id}`, { headers: this.getHeaders() })
  }

  saveTask(id: number, title: string, description: string): Observable<boolean> {
    return id > 0
      ? this.http.put<any>(`${API_URL}/tasks/${id}`, { title, description }, { headers: this.getHeaders() })
      : this.http.post<any>(`${API_URL}/tasks/`, { title, description }, { headers: this.getHeaders() })
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/tasks/${id}`, { headers: this.getHeaders() })
  }

}
