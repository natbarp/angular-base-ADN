import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../shared/service/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-borrar-producto',
  templateUrl: './borrar-producto.component.html',
  styleUrls: ['./borrar-producto.component.scss']
})
export class BorrarProductoComponent implements OnInit {
  productoForm: FormGroup;
  esVisible: Boolean = false;
  datosRecibidos: any;
  mensajeRespuesta: String;

  constructor(protected productoServices: ProductoService) { }

  ngOnInit() {
    this.construirFormularioProducto();
  }

  borrar() {
    this.productoServices.eliminar(this.productoForm.value)
      .subscribe(
        (successData) => {
          this.datosRecibidos = successData;
          this.mostrarData(this.datosRecibidos);
          return successData;
      },
        (error) => this.mostrarData(error.error.mensaje)
    );
  }

  private construirFormularioProducto() {
    this.productoForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
    });
  }

  mostrarData(respuesta: any){
    this.esVisible = true;
    if(respuesta==null){
      this.mensajeRespuesta='Registro eliminado';
    }
    else{
      this.mensajeRespuesta=respuesta;
    }

  }

}
