import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Card } from '../models/cards.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

 
  private apiCard: string = environment.apiCard;

  constructor(private http: HttpClient) { }

  createHeader(): HttpHeaders {

    let headers = new HttpHeaders();

    headers = headers.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return headers;
  }

  getCards() {
    return this.http.get<any>(this.apiCard);
  }
  getCard(id: number) {
    return this.http.get<any>(this.apiCard + "/" + id );
  }

  putCard(id: number, card: Card) {
    return this.http.put<any>(this.apiCard + "/"+ id, card, { headers: this.createHeader() });
  }

  postCard(card: FormData) {
    return this.http.post<any>(this.apiCard, card, { headers: this.createHeader() });
  }
  deleteCard(id: number) {
    return this.http.delete<any>(this.apiCard + "/" + id,  { headers: this.createHeader() });
  }
}
