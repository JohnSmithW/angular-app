import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:3000/schedule';

  constructor(private http: HttpClient) {}

  getSchedule(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveSchedule(schedule: any[]): Observable<void> {
    return this.http.post<void>(this.apiUrl, schedule);
  }
}