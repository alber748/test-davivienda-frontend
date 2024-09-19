import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabla-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tabla-clientes.component.html'
})
export class TablaClientesComponent {
  @Input() clientes: Cliente[] = [];
  @Output() editCliente = new EventEmitter<Cliente>();

  onEdit(cliente: Cliente) {
    this.editCliente.emit(cliente);
  }
}