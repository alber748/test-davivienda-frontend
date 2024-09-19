import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, EstadoCivil, ActividadesEconomicas } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-modal-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-cliente.component.html'
})
export class ModalClienteComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() clienteEdit: Cliente | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() reloadClientes = new EventEmitter<void>();

  // Datos para los selects
  estadosCiviles: EstadoCivil[] = [];
  actividadesEconomicas: ActividadesEconomicas[] = [];
  
  formData = {
    dui: '',
    nit: '',
    nombres: '',
    apellidos: '',
    sexo: '',
    estadoCivil: { id: 0 },
    actividadesEconomicas: { id: 0 }
  };

  constructor(private clientesService: ClienteService) {}

  ngOnInit(): void {
    this.getEstadosCiviles();
    this.getActividadesEconomicas();
    if (this.clienteEdit) {
      this.populateForm();  // Rellenar el formulario si es para edición
    }
  }

  getEstadosCiviles(): void {
    this.clientesService.getEstadosCiviles().subscribe(
      (data: EstadoCivil[]) => {
        this.estadosCiviles = data;
      },
      (error) => {
        console.error('Error al obtener estados civiles', error);
      }
    );
  }

  getActividadesEconomicas(): void {
    this.clientesService.getActividadesEconomicas().subscribe(
      (data: ActividadesEconomicas[]) => {
        this.actividadesEconomicas = data;
      },
      (error) => {
        console.error('Error al obtener actividades económicas', error);
      }
    );
  }

  populateForm() {
    if (this.clienteEdit) {
      this.formData = {
        dui: this.clienteEdit.dui,
        nit: this.clienteEdit.nit,
        nombres: this.clienteEdit.nombres,
        apellidos: this.clienteEdit.apellidos,
        sexo: this.clienteEdit.sexo,
        estadoCivil: { id: this.clienteEdit.estadoCivil.id },
        actividadesEconomicas: { id: this.clienteEdit.actividadesEconomicas.id }
      };
    }
  }

  onSubmit() {
    if (this.clienteEdit) {
      this.clientesService.updateCliente(this.clienteEdit.id!, this.formData).subscribe(
        (response) => {
          console.log('Cliente actualizado:', response);
          this.resetForm();
          this.close.emit();
          this.reloadClientes.emit(); 
        },
        (error) => {
          console.error('Error al actualizar cliente:', error);
        }
      );
    } else {
      // Crear nuevo cliente
      this.clientesService.createCliente(this.formData).subscribe(
        (response) => {
          console.log('Cliente creado:', response);
          this.resetForm();
          this.close.emit();
          this.reloadClientes.emit(); 
        },
        (error) => {
          console.error('Error al crear cliente:', error);
        }
      );
    }
  }

  closeModal() {
    this.close.emit();
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      dui: '',
      nit: '',
      nombres: '',
      apellidos: '',
      sexo: '',
      estadoCivil: { id: 0 },
      actividadesEconomicas: { id: 0 }
    };
  }
}