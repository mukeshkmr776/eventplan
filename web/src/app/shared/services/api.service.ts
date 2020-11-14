import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  uploadAudioFile(data: FormData, options?) {
    return this.http.post('api/upload', data).toPromise();
  }

  constructor(private http: HttpClient) { }

  getAllEvents(params?: any) {
    return this.http.get('api/event', { params }).toPromise();
  }

  getEvent(id: string) {
    return this.http.get('api/event/' + id).toPromise();
  }

  saveEvent(data: any) {
    return this.http.post('api/event', data).toPromise();
  }

  updateEvent(id: string, data: any) {
    return this.http.put('api/event/' + id, data).toPromise();
  }

  deleteEvent(id: string) {
    return this.http.delete('api/event/' + id).toPromise();
  }

  deleteAllEvent() {
    return this.http.delete('api/event').toPromise();
  }

  login(username: string, password: string) {
    return this.http.post('api/login', { username, password });
  }

}
