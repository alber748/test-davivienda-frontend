export interface Solicitud {
  id?: number;
  fechaCreacion: string;
  monto: number;
  plazo: number;
  formaPago: {
    id: number;
    descripcion: string;
  };
  cliente_id: number;
}
export interface SolicitudSend {
  fechaCreacion: string;
  monto: number;
  plazo: number;
  formaPago: {
    id : number
  };
  cliente_id: number;
}

export interface FormaPago {
  id: number;
  descripcion: string;
}