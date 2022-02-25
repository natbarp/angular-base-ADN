import { Component, OnInit } from '@angular/core';
import { GuarderiaService } from '../../shared/service/guarderia.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Factura } from '@producto/shared/model/factura';

const NUMERO_MAXIMO = 9999999999;

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss']
})
export class CrearSolicitudComponent implements OnInit {
  solicitudForm: FormGroup;
  factura: Factura;
  mostrarModal = false;
  mostrarContenidoModal = false;
  mensajeError: string;

  constructor(protected guarderiaService: GuarderiaService) { }

  ngOnInit() {
    this.construirFormularioProducto();
  }

  crear() {
    this.guarderiaService.guardar(this.solicitudForm.value).subscribe(
      data => {
        this.factura = data;
        this.visibilidadModal(null);
      },
      error => {
        this.visibilidadModal(error.error.mensaje);
      }
    );
  }

  visibilidadModal(respuesta: string){
    this.mostrarModal = !this.mostrarModal;
    if (respuesta == null){
      this.mostrarContenidoModal = true;
    }
    else{
      this.mostrarContenidoModal = false;
      this.mensajeError = respuesta;
    }

  }

  public construirFormularioProducto() {
    this.solicitudForm = new FormGroup({
      nombrePropietario: new FormControl('', [Validators.required]),
      idPropietario: new FormControl('', [Validators.required, Validators.max(NUMERO_MAXIMO)]),
      tipoAnimal: new FormControl('', [Validators.required]),
      fechaIngreso: new FormControl('', [Validators.required]),
      diasEstadia: new FormControl('', [Validators.required])
      // descripcion: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
      //                                                        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)])
    });
  }

}
