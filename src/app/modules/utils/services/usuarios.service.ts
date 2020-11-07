import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUsuario: string = environment.apiUsuario;

  constructor(private http: HttpClient) { }

  createHeader(): HttpHeaders {

    let headers = new HttpHeaders();

    headers = headers.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return headers;
  }

  getCards() {
    return this.http.get<any>(this.apiUsuario);
  }
  getCard(id: number) {
    return this.http.get<any>(this.apiUsuario + "/" + id );
  }

  postUserSignin(user: Usuario) {
    return this.http.post<any>(this.apiUsuario + "/signin" , user);
  }

  putCard(id: number, user: Usuario) {
    return this.http.put<any>(this.apiUsuario + "/"+ id, user, { headers: this.createHeader() });
  }

  postUserSignup(user: Usuario) {
    return this.http.post<any>(this.apiUsuario + "/signup" , user, { headers: this.createHeader() });
  }

  deleteUser(id: number) {
    return this.http.delete<any>(this.apiUsuario + "/" + id,  { headers: this.createHeader() });
  }
}
