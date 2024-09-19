import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Solicitud } from '../../models/solicitud';
import { CommonModule } from '@angular/common';
import { ModalClienteComponent } from "../modal-cliente/modal-cliente.component";

@Component({
  selector: 'app-tabla-solicitud',
  standalone: true,
  imports: [RouterLink, CommonModule, ModalClienteComponent],
  templateUrl: './tabla-solicitud.component.html'
})
export class TablaSolicitudComponent {
  @Input() solicitudes: Solicitud[] = [];
  @Output() editSolicitud = new EventEmitter<Solicitud>();  // Emitimos el evento para editar

  public showModal : boolean = false

  onEdit(solicitud: Solicitud) {
    console.log(solicitud)
    this.editSolicitud.emit(solicitud);  // Enviamos la solicitud seleccionada
  }
}
