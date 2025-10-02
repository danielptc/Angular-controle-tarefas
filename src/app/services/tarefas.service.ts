import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarefasService {
  private apiUrl = 'http://localhost:8080/api/tarefas';

  constructor(private http: HttpClient) {}

  getDados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  postDados(dados: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dados);
  }

  deleteTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  putDados(id: number, dados: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dados);
  }

    marcarComoConcluida(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/concluir`, {});
  }

  marcarComoPendente(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/pendente`, {});
  }
}
