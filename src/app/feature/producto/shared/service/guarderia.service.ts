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

  public guardar(producto: Solicitud) {
    if(producto.fechaIngreso.indexOf(' 00:00:00')<0) {
      producto.fechaIngreso = producto.fechaIngreso.replace(/\s+/g, ' ')+' 00:00:00';
    }
    return this.http.doPost<Solicitud,Factura>(`${environment.endpoint}/crear`, producto,
                                                this.http.optsName('crear registro'));
  }

  public actualizar(producto: Solicitud) {
    if(producto.fechaIngreso.indexOf(' 00:00:00')<0) {
      producto.fechaIngreso = producto.fechaIngreso.replace(/\s+/g, ' ')+' 00:00:00';
    }
    return this.http.doPut<Solicitud,Factura>(`${environment.endpoint}/actualizar/${producto.id}`, producto,
                                                this.http.optsName('actualizar registro'));
  }

  public eliminar(id: number) {
    return this.http.doDelete<Boolean>(`${environment.endpoint}/borrar/${id}`,
                                                 this.http.optsName('eliminar productos'));
  }
}
