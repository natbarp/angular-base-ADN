import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GuarderiaService } from '@producto/shared/service/guarderia.service';
import { Solicitud } from '@producto/shared/model/solicitud';
import { Factura } from '@producto/shared/model/factura';

const NUMERO_MÁXIMO = 9999999999;

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.scss']
})
export class ListarProductoComponent implements OnInit {
  public listaProductos: Observable<Solicitud[]>;
  public respuestaBorrado: Observable<Boolean>;
  esVisible: Boolean = false;
  mostrarContenidoModal: Boolean = false;
  mensajeRespuesta: String;
  datosRecibidos: any;
  solicitudForm: FormGroup;
  registroSeleccionado: number;
  registro: Solicitud;
  factura: Factura;

  constructor(protected guarderiaService: GuarderiaService) {}

  ngOnInit() {
    this.listaProductos = this.guarderiaService.consultar();
    this.construirFormularioProducto();
  }

  borrar(id: number) {
    var confirmar = confirm("Seguro que desea eliminar el resgistro No." + id);
    if (confirmar == true) {
      this.guarderiaService.eliminar(id)
        .subscribe(
          (successData) => {
            this.datosRecibidos = successData;
            console.log("----status----");
            console.log(successData);
            this.mostrarData(this.datosRecibidos);
            this.listaProductos = this.guarderiaService.consultar();
            return successData;
        },
          (error) => {
            this.mostrarData(error.error.mensaje);
          }
      );

    }
  }

  mostrarData(respuesta: any){
    if(respuesta==null){
      this.mensajeRespuesta='Registro eliminado';
      console.log(this.mensajeRespuesta);
    }
    else{
      this.mensajeRespuesta=respuesta;
      console.log(this.mensajeRespuesta);
    }
  }

  actualizar(producto: Solicitud){
    this.visibilidadModal();
    this.visibilidadContenidoModal();
    this.registroSeleccionado = +producto.id; //convierte string en numerico
    this.registro = producto;
    let division = this.registro.fechaIngreso.split(" ");
    this.registro.fechaIngreso = division[0];
  }

  guardarActualizacion(){
    console.log("----Datos a actualizar----");
    this.solicitudForm.value.id = this.registro.id;
    console.log(this.solicitudForm.value);
    this.guarderiaService.actualizar(this.solicitudForm.value).subscribe(data => {
      this.factura = data;

      return data;
    });
    this.visibilidadContenidoModal();
  }

  visibilidadModal(){
    this.esVisible = !this.esVisible;
    if(this.esVisible){
        this.solicitudForm.controls['id'].disable();
    }
  }

  visibilidadContenidoModal(){
    this.mostrarContenidoModal = !this.mostrarContenidoModal;
  }

  private construirFormularioProducto() {
    this.solicitudForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombrePropietario: new FormControl('', [Validators.required]),
      idPropietario: new FormControl('', [Validators.required, Validators.max(NUMERO_MÁXIMO)]),
      tipoAnimal: new FormControl('', [Validators.required]),
      fechaIngreso: new FormControl('', [Validators.required]),
      diasEstadia: new FormControl('', [Validators.required])
    });
  }

}
