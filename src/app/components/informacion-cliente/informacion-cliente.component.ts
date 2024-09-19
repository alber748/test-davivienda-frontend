import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalClienteComponent } from "../modal-cliente/modal-cliente.component";

interface ClienteInfo {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
}

@Component({
  selector: 'app-informacion-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalClienteComponent],
  templateUrl: './informacion-cliente.component.html'
})
export class InformacionClienteComponent {
  cliente: ClienteInfo = {
    nombre: 'Juan Pérez',
    direccion: 'Calle Principal 123, Ciudad',
    telefono: '123-456-7890',
    email: 'juan.perez@example.com'
  };

  editing = false;
  editedCliente: ClienteInfo = { ...this.cliente };

  handleEdit() {
    this.editing = true;
    this.editedCliente = { ...this.cliente };
  }

  handleSave() {
    this.cliente = { ...this.editedCliente };
    this.editing = false;
    alert('Los datos del cliente han sido actualizados exitosamente.');
  }

  public isModalVisible : boolean = false;

  abrirModal() {
    console.log('abriendo........')
    this.isModalVisible = true;
  }

  cerrarModal() {
    this.isModalVisible = false;
  }
}
