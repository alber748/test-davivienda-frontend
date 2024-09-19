import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Importamos ActivatedRoute
import { Solicitud } from '../../../models/solicitud';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { TablaSolicitudComponent } from '../../../components/tabla-solicitud/tabla-solicitud.component';
import { ModalSolicitudComponent } from '../../../components/modal-solicitud/modal-solicitud.component';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";
import { MenuComponent } from "../../../components/menu/menu.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solicitudes-cliente',
  templateUrl: './solicitudes-cliente.component.html',
  standalone: true,
  imports: [TablaSolicitudComponent, ModalSolicitudComponent, SpinnerComponent, MenuComponent, CommonModule, FormsModule],
})
export class SolicitudesClienteComponent implements OnInit {
  public cargando: boolean = true;
  public isModalVisible: boolean = false;
  public solicitudEdit: Solicitud | null = null; 
  solicitudes: Solicitud[] = [];
  public idSolicitud: number | null = null;
  public idCliente: number = 0;

  constructor(
    private solicitudesService: SolicitudesService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCliente = +params['id'];
      this.getSolicitudes();
    });
  }

  getSolicitudes(): void {
    this.cargando = true;
    this.solicitudesService.getSolicitudesByCliente(this.idCliente).subscribe( 
      (data: any) => {
        this.solicitudes = data.solicitudes;
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
        this.solicitudes = [];
        this.solicitudes.push(data);
        this.cargando = false;
      },
      (error) => {
        this.solicitudes = [];
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
    console.log(solicitud);
    this.solicitudEdit = solicitud; 
    setTimeout(() => {
      this.isModalVisible = true;
    }, 50);
  }

  cerrarModal() {
    this.isModalVisible = false;
    this.solicitudEdit = null;
  }

  recargarSolicitudes() {
    this.getSolicitudes(); 
  }
}