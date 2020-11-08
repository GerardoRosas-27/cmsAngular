import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private apiPage: string = environment.apiPage;

  constructor(private http: HttpClient) { }

  createHeader(): HttpHeaders {

    let headers = new HttpHeaders();

    headers = headers.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return headers;
  }

  getPages() {
    return this.http.get<any>(this.apiPage);
  }
  getPage(id: number) {
    return this.http.get<any>(this.apiPage + "/" + id );
  }

  putPage(id: number, page: FormData) {
    return this.http.put<any>(this.apiPage + "/"+ id, page, { headers: this.createHeader() });
  }

  postPage(page: FormData) {
    return this.http.post<any>(this.apiPage, page, { headers: this.createHeader() });
  }

  deletePage(id: number) {
    return this.http.delete<any>(this.apiPage + "/" + id,  { headers: this.createHeader() });
  }
}
