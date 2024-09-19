import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../../models/solicitud';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { TablaSolicitudComponent } from '../../../components/tabla-solicitud/tabla-solicitud.component';
import { ModalSolicitudComponent } from '../../../components/modal-solicitud/modal-solicitud.component';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";
import { MenuComponent } from "../../../components/menu/menu.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-solicitudes',
  templateUrl: './home-solicitudes.component.html',
  standalone: true,
  imports: [TablaSolicitudComponent, ModalSolicitudComponent, SpinnerComponent, MenuComponent, CommonModule, FormsModule], 
})
export class HomeSolicitudesComponent implements OnInit {
  public cargando: boolean = true;
  public isModalVisible: boolean = false;
  public solicitudEdit: Solicitud | null = null;
  solicitudes: Solicitud[] = [];
  public idSolicitud = null
  constructor(private solicitudesService: SolicitudesService) { }

  ngOnInit(): void {
    this.getSolicitudes();
  }

  getSolicitudes(): void {
    this.cargando = true;
    this.idSolicitud = null
    this.solicitudesService.getSolicitudes().subscribe(
      (data: Solicitud[]) => {
        this.solicitudes = data;
        this.cargando = false;
      },
      (error) => {
        console.error('Error al obtener solicitudes', error);
        this.cargando = false;
      }
    );
  }

  buscarSolicitud() {
    this.cargando = true;
    this.solicitudesService.getSolicitudById(this.idSolicitud!).subscribe(
      (data: Solicitud) => {
        this.solicitudes = []
        this.solicitudes.push(data)
        this.cargando = false;
      },
      (error) => {
        this.solicitudes = []
        console.error('Error al obtener solicitudes', error);
        this.cargando = false;
      }
    );
  }

  abrirModalAgregar() {
    this.isModalVisible = true;
    this.solicitudEdit = null; 
  }

  abrirModalEditar(solicitud: Solicitud) {
    console.log(solicitud)
    this.solicitudEdit = solicitud; 
    setTimeout(() => {
      this.isModalVisible = true;
    }, 50);
  }

  // Cerrar modal
  cerrarModal() {
    this.isModalVisible = false;
    this.solicitudEdit = null
  }

  recargarSolicitudes() {
    this.getSolicitudes(); 
  }
}