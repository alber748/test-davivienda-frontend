import { Component } from '@angular/core';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";
import { TablaSolicitudComponent } from "../../../components/tabla-solicitud/tabla-solicitud.component";
import { MenuComponent } from "../../../components/menu/menu.component";
import { InformacionClienteComponent } from "../../../components/informacion-cliente/informacion-cliente.component";

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [SpinnerComponent, TablaSolicitudComponent, MenuComponent, InformacionClienteComponent],
  templateUrl: './cliente.component.html'
})
export class ClienteComponent {

  
}
