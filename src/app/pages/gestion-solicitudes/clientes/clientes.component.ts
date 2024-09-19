import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { ModalClienteComponent } from '../../../components/modal-cliente/modal-cliente.component';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";
import { MenuComponent } from "../../../components/menu/menu.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TablaClientesComponent } from '../../../components/tabla-clientes/tabla-clientes.component';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  standalone: true,
  imports: [TablaClientesComponent, ModalClienteComponent, SpinnerComponent, MenuComponent, CommonModule, FormsModule], 
})
export class ClientesComponent implements OnInit {
  public cargando: boolean = true;
  public isModalVisible: boolean = false;
  public clienteEdit: Cliente | null = null;
  clientes: Cliente[] = [];
  public idCliente = null;

  constructor(private clientesService: ClienteService) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.cargando = true;
    this.clientesService.getClientes().subscribe(
      (data: Cliente[]) => {
        this.clientes = data;
        this.cargando = false;
      },
      (error) => {
        console.error('Error al obtener clientes', error);
        this.cargando = false;
      }
    );
  }

  buscarCliente() {
    this.cargando = true;
    this.clientesService.getClienteById(this.idCliente!).subscribe(
      (data: Cliente) => {
        this.clientes = [];
        this.clientes.push(data);
        this.cargando = false;
      },
      (error) => {
        this.clientes = [];
        console.error('Error al obtener cliente', error);
        this.cargando = false;
      }
    );
  }


  abrirModalAgregar() {
    this.isModalVisible = true;
    this.clienteEdit = null;
  }


  abrirModalEditar(cliente: Cliente) {
    console.log(cliente);
    this.clienteEdit = cliente;
    setTimeout(() => {
      this.isModalVisible = true;
    }, 50);
  }

  // Cerrar modal
  cerrarModal() {
    this.isModalVisible = false;
    this.clienteEdit = null;
  }


  recargarClientes() {
    this.getClientes();
  }
}