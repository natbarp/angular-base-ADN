import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../shared/service/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Factura } from '@producto/shared/model/factura';

// const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
// const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;
const NUMERO_MÁXIMO = 9999999999;

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  factura: Factura;
  esVisible: Boolean = false;

  constructor(protected productoServices: ProductoService) { }

  ngOnInit() {
    this.construirFormularioProducto();
  }

  crear() {
    console.log(this.productoForm.value);
    this.productoServices.guardar(this.productoForm.value).subscribe(data => {
      this.factura = data;
      this.mostrarData(this.factura);
      return data;
    });
  }

  mostrarData(respuesta: Factura){
    this.esVisible = true;
    console.log("Respuesta POST:")
    console.log(respuesta);
  }

  private construirFormularioProducto() {
    this.productoForm = new FormGroup({
      nombrePropietario: new FormControl('', [Validators.required]),
      idPropietario: new FormControl('', [Validators.required, Validators.max(NUMERO_MÁXIMO)]),
      tipoAnimal: new FormControl('', [Validators.required]),
      fechaIngreso: new FormControl('', [Validators.required]),
      diasEstadia: new FormControl('', [Validators.required])
      // descripcion: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
      //                                                        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)])
    });
  }

}
