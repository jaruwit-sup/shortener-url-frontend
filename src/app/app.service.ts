import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from 'src/model/url';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  shortenUrl(longUrl: any) {
    return this.http.post<Url>('http://localhost:3000/urls/shorten', { longUrl });
  }
}
