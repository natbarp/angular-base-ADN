import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { ListarProductoComponent } from './components/listar-solicitud/listar-solicitud.component';
import { GuarderiaComponent } from './components/guarderia/guarderia.component';


const routes: Routes = [
  {
    path: '',
    component: GuarderiaComponent,
    children: [
      {
        path: 'crear',
        component: CrearSolicitudComponent
      },
      {
        path: 'listar',
        component: ListarProductoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuarderiaRoutingModule { }
