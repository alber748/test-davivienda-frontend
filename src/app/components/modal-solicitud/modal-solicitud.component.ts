import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormaPago, Solicitud } from '../../models/solicitud';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-modal-solicitud',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-solicitud.component.html'
})
export class ModalSolicitudComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() idCliente = 0
  @Input() solicitudEdit: Solicitud | null = null; 
  @Output() close = new EventEmitter<void>();
  @Output() reloadSolicitudes = new EventEmitter<void>(); 
  
  formasPago: FormaPago[] = [];
  
  formData = {
    cliente_id: this.idCliente,
    fechaCreacion: '',
    monto: 0,
    plazo: 0,
    formaPago: { id: 0 }
  };

  constructor(private solicitudesService: SolicitudesService) {
    console.log(console.log(this.idCliente))

  }

  ngOnInit(): void {
    this.getFormasPago();
    if (this.solicitudEdit) {
      this.populateForm(); 
    }
  }

  getFormasPago(): void {
    this.formData.cliente_id = this.idCliente
    this.solicitudesService.getFormasPago().subscribe(
      (data: FormaPago[]) => {
        this.formasPago = data;
      },
      (error) => {
        console.error('Error al obtener formas de pago', error);
      }
    );
  }

  populateForm() {
    if (this.solicitudEdit) {
      this.formData = {
        cliente_id: this.solicitudEdit.cliente_id,
        fechaCreacion: this.solicitudEdit.fechaCreacion,
        monto: this.solicitudEdit.monto,
        plazo: this.solicitudEdit.plazo,
        formaPago: { id: this.solicitudEdit.formaPago.id }
      };
    }
  }

  onSubmit() {
    if (this.solicitudEdit) {
      console.log('entramos aqui')
      // Editar solicitud existente
      this.solicitudesService.updateSolicitud(this.solicitudEdit.id!, this.formData).subscribe(
        (response) => {
          console.log('Solicitud actualizada:', response);
          this.resetForm();
          this.close.emit();
          this.reloadSolicitudes.emit(); 
        },
        (error) => {
          console.error('Error al actualizar solicitud:', error);
        }
      );
    } else {
      // Crear nueva solicitud
      console.log('entramos aqui 222')

      this.solicitudesService.createSolicitud(this.formData.cliente_id, this.formData).subscribe(
        (response) => {
          console.log('Solicitud creada:', response);
          this.resetForm();
          this.close.emit();
          this.reloadSolicitudes.emit(); 
        },
        (error) => {
          console.error('Error al crear solicitud:', error);
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
      cliente_id: 0,
      fechaCreacion: '',
      monto: 0,
      plazo: 0,
      formaPago: { id: 0 }
    };
  }
}