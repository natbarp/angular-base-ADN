import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Solicitud } from '../model/solicitud';
import { Factura } from '../model/factura';


@Injectable()
export class GuarderiaService {

  public factura: Factura;
  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Solicitud[]>(`${environment.endpoint}/listar`, this.http.optsName('consultar registros'));
  }

  public guardar(solicitud: Solicitud) {
    if (solicitud.fechaIngreso.indexOf(' 00:00:00') < 0) {
      solicitud.fechaIngreso = solicitud.fechaIngreso.replace(/\s+/g, ' ') + ' 00:00:00';
    }
    return this.http.doPost<Solicitud, Factura>(`${environment.endpoint}/crear`, solicitud,
                                                this.http.optsName('crear registro'));
  }

  public actualizar(solicitud: Solicitud) {
    if (solicitud.fechaIngreso.indexOf(' 00:00:00') < 0) {
      solicitud.fechaIngreso = solicitud.fechaIngreso.replace(/\s+/g, ' ') + ' 00:00:00';
    }
    return this.http.doPut<Solicitud, Factura>(`${environment.endpoint}/actualizar/${solicitud.id}`, solicitud,
                                                this.http.optsName('actualizar registro'));
  }

  public eliminar(id: number) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/borrar/${id}`,
                                                 this.http.optsName('eliminar registro'));
  }
}
