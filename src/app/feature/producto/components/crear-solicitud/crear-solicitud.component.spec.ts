import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';

import { CrearSolicitudComponent } from './crear-solicitud.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { GuarderiaService } from '../../shared/service/guarderia.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { Factura } from '@producto/shared/model/factura';

describe('CrearProductoComponent', () => {
  let component: CrearSolicitudComponent;
  let fixture: ComponentFixture<CrearSolicitudComponent>;
  // let productoService: ProductoService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearSolicitudComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [GuarderiaService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSolicitudComponent);
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
    expect(component.solicitudForm.valid).toBeFalsy();
  });

  it('Registrando producto', () => {
    expect(component.solicitudForm.valid).toBeFalsy();
    component.solicitudForm.controls.nombrePropietario.setValue('Natalia Barbosa');
    component.solicitudForm.controls.idPropietario.setValue(12345);
    component.solicitudForm.controls.tipoAnimal.setValue('GATO');
    component.solicitudForm.controls.fechaIngreso.setValue('2022-03-03');
    component.solicitudForm.controls.diasEstadia.setValue(3);
    expect(component.solicitudForm.valid).toBeTruthy();

    component.crear();

    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });
});
