import { NgModule } from '@angular/core';
import { GuarderiaRoutingModule } from './guarderia-routing.module';
import { ListarProductoComponent } from './components/listar-solicitud/listar-solicitud.component';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { GuarderiaComponent } from './components/guarderia/guarderia.component';
import { SharedModule } from '@shared/shared.module';
import { GuarderiaService } from './shared/service/guarderia.service';


@NgModule({
  declarations: [
    CrearSolicitudComponent,
    ListarProductoComponent,
    GuarderiaComponent
  ],
  imports: [
    GuarderiaRoutingModule,
    SharedModule
  ],
  providers: [GuarderiaService]
})
export class GuarderiaModule { }
