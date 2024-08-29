import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../Interfaces/job';
import { Employee } from '../Interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:3001/jobs';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobsById(id: string): Observable<Job> { 
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post('http://localhost:3001/upload', formData);
  }

  uploadResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('resume', file);
    return this.http.post('http://localhost:3001/upload-resume', formData);
  }

  applyForJob(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:3001/apply', employee);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3001/employees');
  }
}
