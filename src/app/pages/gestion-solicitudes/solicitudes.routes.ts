import {  Routes } from "@angular/router";
import { HomeSolicitudesComponent } from "./home-solicitudes/home-solicitudes.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { SolicitudesClienteComponent } from "./solicitudes-cliente/solicitudes-cliente.component";


const routes : Routes = [
      {
            path : '',
            component: HomeSolicitudesComponent
      },
      {
            path : 'cliente/:id',
            component : ClientesComponent
      },
      {
            path : 'clientes',
            component : ClientesComponent
      },
      {
            path : 'solicitudes-cliente/:id',
            component : SolicitudesClienteComponent
      }
]

export default routes;