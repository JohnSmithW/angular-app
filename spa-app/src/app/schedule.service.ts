import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:3000/schedule';

  constructor(private http: HttpClient) {}

  getSchedule(): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found in localStorage');
      throw new Error('No token found in localStorage');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      tap(response => {
        console.log('Schedule fetched successfully:', response);
      }),
      tap(null, error => {
        console.error('Failed to fetch schedule:', error); 
      })
    );
  }

  saveSchedule(schedule: any[]): Observable<void> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found in localStorage');
      throw new Error('No token found in localStorage');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<void>(this.apiUrl, schedule, { headers }).pipe(
      tap(() => {
        console.log('Schedule saved successfully'); 
      }),
      tap(null, error => {
        console.error('Failed to save schedule:', error);
      })
    );
  }

  checkSchedule(): Observable<string> {
    const testApiUrl = 'http://localhost:3000/check-time';
    return this.http.get<string>(testApiUrl, { responseType: 'text' as 'json' }).pipe(
      tap(response => {
        alert('Request worked: ' + response);
      }),
      tap(null, error => {
        alert('Request not allowed: ' + error.message);
      })
    );
  }
}