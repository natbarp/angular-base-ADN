import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CrearSolicitudComponent } from './crear-solicitud.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { GuarderiaService } from '../../shared/service/guarderia.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Solicitud } from '@producto/shared/model/solicitud';
import { Factura } from '@producto/shared/model/factura';
import { of, throwError } from 'rxjs';

describe('CrearProductoComponent', () => {
  let component: CrearSolicitudComponent;
  let fixture: ComponentFixture<CrearSolicitudComponent>;
  let guarderiaService: GuarderiaService;
  const solicitud: Solicitud = new Solicitud('1', 'Test', '123', 'PERRO', '2022-03-03 17:00:00', '7');
  const factura: Factura =  new Factura({
    descuento: false,
    diasEstadia: 7,
    valorDiaRegular: 30000.0,
    valorDiaFDS: 34500.0,
    valorFacturado: 219000.0
  });


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearSolicitudComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
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
    guarderiaService = TestBed.inject(GuarderiaService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit -> Debería ejecutar lo de ngOnInit, por lo que debe ser llamada la funcion construirFormularioProducto', () => {
    const llamarFormulario = spyOn(component, 'construirFormularioProducto');
    component.ngOnInit();
    expect(llamarFormulario).toHaveBeenCalled();
  });

  it(`#crear -> Debería llamar al servicio guardar y retornar obj factura. El metodo visibilidadModal
      tambien debería ser llamado y factura del componente debe ser igual al valor retornado`, fakeAsync(() => {
    // arrange
    component.construirFormularioProducto();
    const respuestaServicioGuardar = spyOn(guarderiaService, 'guardar').and.returnValue(of(factura));
    const visibilidadModal = spyOn(component, 'visibilidadModal');
    // act
    component.crear();
    tick(100);
    // assert
    expect(component.factura).toBe(factura);
    expect(visibilidadModal).toHaveBeenCalled();
    expect(respuestaServicioGuardar).toHaveBeenCalled();
  }));

  it(`#crear -> Debería llamarse al catch, por lo que factura es indefinida y se llama al metodo visibilidadModal
      con el mensaje de error`, fakeAsync(() => {
    // arrange
    component.construirFormularioProducto();
    const mensajeError = 'No es posible crear';
    const respuestaServicioGuardar = spyOn(guarderiaService, 'guardar').and.returnValue(throwError({status: 404, error: {mensaje: mensajeError}}));
    const visibilidadModal = spyOn(component, 'visibilidadModal');
    // act
    component.crear();
    tick(100);
    // assert
    expect(component.factura).not.toBeDefined();
    expect(visibilidadModal).toHaveBeenCalledWith(mensajeError);
    expect(respuestaServicioGuardar).toHaveBeenCalled();
  }));


  it(`#construirFormularioProducto -> Formulario invalido cuando está vacio`, () => {
    // act - assert
    component.construirFormularioProducto();
    expect(component.solicitudForm.valid).toBeFalsy();
  });

  it(`#construirFormularioProducto -> Formulario valido cuando está diligenciado`, () => {
    // act
    component.construirFormularioProducto();
    component.solicitudForm.controls.nombrePropietario.setValue(solicitud.nombrePropietario);
    component.solicitudForm.controls.idPropietario.setValue(solicitud.idPropietario);
    component.solicitudForm.controls.tipoAnimal.setValue(solicitud.tipoAnimal);
    component.solicitudForm.controls.fechaIngreso.setValue(solicitud.fechaIngreso);
    component.solicitudForm.controls.diasEstadia.setValue(solicitud.diasEstadia);
    // assert
    expect(component.solicitudForm.valid).toBeTruthy();
  });

  it(`#visibilidadModal -> Recibe como argumento null, mostrarModal alterna su estado, y mostrarContenidoModal es true`, () => {
    // act - assert
    component.visibilidadModal(null);
    expect(component.mostrarModal).toBeTrue();
    expect(component.mostrarContenidoModal).toBeTrue();
  });

  it(`#visibilidadModal -> Recibe como argumento un mensaje, mostrarModal alterna su estado, mostrarContenidoModal es false,
      y mensajeError igual a argumento de la funcion`, () => {
    // arrange
    const mensajeError = 'Mensaje de prueba';
    // act - assert
    component.visibilidadModal(mensajeError);
    expect(component.mostrarModal).toBeTrue();
    expect(component.mostrarContenidoModal).toBeFalse();
    expect(component.mensajeError).toBe(mensajeError);
  });



});
