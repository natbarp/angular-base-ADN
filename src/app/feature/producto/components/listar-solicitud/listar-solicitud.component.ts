import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GuarderiaService } from '@producto/shared/service/guarderia.service';
import { Solicitud } from '@producto/shared/model/solicitud';
import { Factura } from '@producto/shared/model/factura';

const NUMERO_MAXIMO = 9999999999;
const MENSAJE_CONFIRMAR = 'Seguro que desea eliminar el resgistro No.';
const ID = 'id';

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.scss']
})
export class ListarSolicitudComponent implements OnInit {
  public listaSolicitudes: Observable<Solicitud[]>;
  public respuestaBorrado: Observable<boolean>;
  esVisible = false;
  mostrarContenidoModal: boolean;
  existeError = false;
  mensajeError: string;
  solicitudForm: FormGroup;
  registroSeleccionado: number;
  registro: Solicitud;
  factura: Factura;



  constructor(protected guarderiaService: GuarderiaService) {}

  ngOnInit() {
    this.listaSolicitudes = this.guarderiaService.consultar();
    this.construirFormularioProducto();
  }

  async borrar(id: number) {
    if (this.confirmarAlert(MENSAJE_CONFIRMAR + id)) {
      try {
        await this.guarderiaService.eliminar(id).toPromise();
        this.listaSolicitudes = this.guarderiaService.consultar();
      } catch (error) {
          this.mensajeError = error.error.mensaje;
          this.mostrarContenidoModal = false;
          this.existeError = true;
        }
    }
  }

  confirmarAlert(mensaje){
    return confirm(mensaje);
  }

  actualizar(solicitud: Solicitud){
    this.visibilidadModal();
    this.mostrarContenidoModal = true;
    this.registro = solicitud;
    const divisionDatoFecha = this.registro.fechaIngreso.split(' ');
    this.registro.fechaIngreso = divisionDatoFecha[0];
  }

  async guardarActualizacion(){
    this.asignarId();
    try {
      this.factura = await this.guarderiaService.actualizar(this.solicitudForm.value).toPromise().then();
    } catch (error) {
        this.mensajeError = error.error.mensaje;
        this.existeError = true;
    }
    this.mostrarContenidoModal = false;
  }

  asignarId(){
    this.solicitudForm.value.id = this.registro.id;
  }

  visibilidadModal(){
    this.esVisible = !this.esVisible;
    if (this.esVisible) {
        this.solicitudForm.controls[ID].disable();
    }
  }

  public construirFormularioProducto() {
    this.solicitudForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombrePropietario: new FormControl('', [Validators.required]),
      idPropietario: new FormControl('', [Validators.required, Validators.max(NUMERO_MAXIMO)]),
      tipoAnimal: new FormControl('', [Validators.required]),
      fechaIngreso: new FormControl('', [Validators.required]),
      diasEstadia: new FormControl('', [Validators.required])
    });
  }

}
