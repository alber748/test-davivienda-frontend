import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, ClienteSend, EstadoCivil, ActividadesEconomicas } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:8080/api/clientes';
  private estadosCivilesUrl = 'http://localhost:8080/api/estados-civiles';
  private actividadesEconomicasUrl = 'http://localhost:8080/api/actividades-economicas';

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}`);
  }

  // Obtener un cliente por su ID
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo cliente
  createCliente(cliente: ClienteSend): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}`, cliente);
  }

  // Actualizar un cliente
  updateCliente(id: number, cliente: ClienteSend): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${id}`, cliente);
  }

  // Eliminar un cliente
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Obtener todas las actividades económicas
  getActividadesEconomicas(): Observable<ActividadesEconomicas[]> {
    return this.http.get<ActividadesEconomicas[]>(`${this.actividadesEconomicasUrl}`);
  }

  // Obtener todos los estados civiles
  getEstadosCiviles(): Observable<EstadoCivil[]> {
    return this.http.get<EstadoCivil[]>(`${this.estadosCivilesUrl}`);
  }
}