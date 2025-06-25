import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trace } from '@opentelemetry/api';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  constructor(private http: HttpClient) {}
    
 getSampleData() {
  return this.http.get('/assets/test.json');
    }
}