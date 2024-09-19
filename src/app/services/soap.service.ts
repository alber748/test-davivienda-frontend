import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonSoap } from '../models/soap-persona';

@Injectable({
  providedIn: 'root'
})
export class SoapService {

  private baseUrl = 'http://localhost:8080/consultarInfoPersona';

  constructor(private http: HttpClient) { }

  getPersonInfo(id: number): Observable<{ findPersonResult: PersonSoap }> {
    return this.http.get<{ findPersonResult: PersonSoap }>(`${this.baseUrl}?id=${id}`);
  }
}