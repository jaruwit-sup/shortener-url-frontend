import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from 'src/model/url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  shortenUrl(longUrl: any) {
    return this.http.post<Url>(`${environment.apiBaseUrl}/urls/shorten`, { longUrl });
  }
}
