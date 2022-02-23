import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';

import { CrearProductoComponent } from './crear-producto.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductoService } from '../../shared/service/producto.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { Factura } from '@producto/shared/model/factura';

describe('CrearProductoComponent', () => {
  let component: CrearProductoComponent;
  let fixture: ComponentFixture<CrearProductoComponent>;
  // let productoService: ProductoService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearProductoComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [ProductoService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProductoComponent);
    component = fixture.componentInstance;
    // productoService = TestBed.inject(ProductoService);
    // const factura = new Factura(false,4,35000.0,40250.0,150500.0);
    // spyOn(productoService, 'guardar').and.returnValue(
    //   of(factura)
    // );
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.productoForm.valid).toBeFalsy();
  });

  it('Registrando producto', () => {
    expect(component.productoForm.valid).toBeFalsy();
    component.productoForm.controls.nombrePropietario.setValue('Natalia Barbosa');
    component.productoForm.controls.idPropietario.setValue(12345);
    component.productoForm.controls.tipoAnimal.setValue('GATO');
    component.productoForm.controls.fechaIngreso.setValue('2022-03-03');
    component.productoForm.controls.diasEstadia.setValue(3);
    expect(component.productoForm.valid).toBeTruthy();

    component.crear();

    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });
});
