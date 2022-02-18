import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from '@producto/shared/service/producto.service';
import { Producto } from '@producto/shared/model/producto';
import { Factura } from '@producto/shared/model/factura';

const NUMERO_MÁXIMO = 9999999999;

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.scss']
})
export class ListarProductoComponent implements OnInit {
  public listaProductos: Observable<Producto[]>;
  esVisible: Boolean = false;
  mensajeRespuesta: String;
  datosRecibidos: any;
  productoForm: FormGroup;
  registroSeleccionado: number;
  registro: Producto;
  factura: Factura;

  constructor(protected productoService: ProductoService) {}

  ngOnInit() {
    this.listaProductos = this.productoService.consultar();
    this.construirFormularioProducto();
  }

  borrar(id) {
    var confirmar = confirm("Seguro que desea eliminar el resgistro No." + id);
    if (confirmar == true) {
      this.productoService.eliminar(id)
        .subscribe(
          (successData) => {
            this.datosRecibidos = successData;
            this.mostrarData(this.datosRecibidos);
            this.listaProductos = this.productoService.consultar();
            return successData;
        },
          (error) => {
            this.mostrarData(error.error.mensaje);
            this.listaProductos = this.productoService.consultar();
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

  actualizar(producto: Producto){
    this.visibilidadModal();
    this.registroSeleccionado = +producto.id; //convierte string en numerico
    this.registro = producto;
    let division = this.registro.fechaIngreso.split(" ");
    this.registro.fechaIngreso = division[0];
  }

  guardarActualizacion(){
    console.log("----Datos a actualizar----");
    this.productoForm.value.id = this.registro.id;
    console.log(this.productoForm.value);
    this.productoService.actualizar(this.productoForm.value).subscribe(data => {
      this.factura = data;
      this.mostrarData(this.factura);
      return data;
    });
    this.visibilidadModal();
  }

  visibilidadModal(){
    this.esVisible = !this.esVisible;
    if(this.esVisible){
        this.productoForm.controls['id'].disable();
    }
  }

  private construirFormularioProducto() {
    this.productoForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombrePropietario: new FormControl('', [Validators.required]),
      idPropietario: new FormControl('', [Validators.required, Validators.max(NUMERO_MÁXIMO)]),
      tipoAnimal: new FormControl('', [Validators.required]),
      fechaIngreso: new FormControl('', [Validators.required]),
      diasEstadia: new FormControl('', [Validators.required])
    });
  }

}
