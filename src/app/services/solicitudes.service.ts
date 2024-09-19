import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormaPago, Solicitud, SolicitudSend } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  
  private baseUrl = 'http://localhost:8080/api/solicitudes'; 
  private formasPagoUrl = 'http://localhost:8080/api/formas-pago';
  constructor(private http: HttpClient) { }

  // Obtener todas las solicitudes
  getSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.baseUrl}`);
  }

  // Obtener una solicitud por su ID
  getSolicitudById(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.baseUrl}/${id}`);
  }
  
  getSolicitudesByCliente(idCliente: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.baseUrl}/cliente/${idCliente}`);
  }

  // Crear una nueva solicitud
  createSolicitud(idCliente: number, solicitud: SolicitudSend): Observable<Solicitud> {
    const url = `${this.baseUrl}/cliente/${idCliente}`;
    return this.http.post<Solicitud>(url, solicitud);
  }
  // Crear una nueva solicitud
  updateSolicitud(idCliente: number, solicitud: SolicitudSend): Observable<Solicitud> {
    const url = `${this.baseUrl}/${idCliente}`;
    return this.http.put<Solicitud>(url, solicitud);
  }


  // Eliminar una solicitud
  deleteSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getFormasPago(): Observable<FormaPago[]> {
    return this.http.get<FormaPago[]>(`${this.formasPagoUrl}`);
  }
}