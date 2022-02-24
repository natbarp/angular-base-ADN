import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarSolicitudComponent } from './listar-solicitud.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { GuarderiaService } from '../../shared/service/guarderia.service';
import { Solicitud } from '../../shared/model/solicitud';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Factura } from '@producto/shared/model/factura';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('ListarProductoComponent', () => {
  let component: ListarSolicitudComponent;
  let fixture: ComponentFixture<ListarSolicitudComponent>;
  let guarderiaService: GuarderiaService;
  // let solicitudForm: FormGroup;
  const solicitud: Solicitud = new Solicitud('1', 'Test', '123', 'PERRO', '2022-03-03 17:00:00', '7');
  const listaSolicitudes: Solicitud[] = [
    new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03 17:00:00', '7'),
    new Solicitud('2', 'Test2', '12345678', 'PERRO', '2022-03-03 17:00:00', '7')
  ];
  const factura: Factura =  new Factura({
    descuento: false,
    diasEstadia: 7,
    valorDiaRegular: 30000.0,
    valorDiaFDS: 34500.0,
    valorFacturado: 219000.0
  });


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarSolicitudComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [GuarderiaService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicitudComponent);
    component = fixture.componentInstance;
    guarderiaService = TestBed.inject(GuarderiaService);

  });

  it('deberia crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia listar solicitudes y su tamaño ser igual a 2', () => {
    // arrange
    spyOn(guarderiaService, 'consultar').and.returnValue(
      of(listaSolicitudes)
    );
    fixture.detectChanges();
    expect(component).toBeTruthy();
    component.listaSolicitudes.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });
  });

  it('#borrar -> Se debería llamar el método confirmarAlert, respuestaBorrar, y servicio eliminar debería return true ', fakeAsync(() => {
    // arrange
    const respuestaServicioEliminar = spyOn(guarderiaService, 'eliminar').and.returnValue(of(true));
    const respuestaServicioConsultar = spyOn(guarderiaService, 'consultar').and.returnValue(of(listaSolicitudes));
    const respuestaConfirmarAlert = spyOn(component, 'confirmarAlert').and.returnValue(true);
    // const respuestaBorrar = spyOn(component, 'respuestaBorrar').and.callThrough();
    // act
    component.borrar(1);
    tick(100);
    // assert
    expect(respuestaServicioEliminar).toHaveBeenCalled();
    expect(respuestaServicioConsultar).toHaveBeenCalled();
    expect(respuestaConfirmarAlert).toHaveBeenCalled();
  }));

  // it('#confirmarAlert -> Debería retornar un true al aceptarse el confirm', () => {
  //   const respuestaConfirmarAlert = spyOn(component, "confirmarAlert").and.callThrough();
  //   expect(respuestaConfirmarAlert).toBeTruthy();
  // });

  // it('#respuestaBorrar -> mensajeRespuesta debería tener el mensaje de registro eliminado', () => {
  //   component.respuestaBorrar(null);
  //   expect(component.mensajeRespuesta).toBe("Registro eliminado");
  // });

  // it('#respuestaBorrar -> mensajeRespuesta debería tener el mismo valor con el que fue llamado', () => {
  //   component.respuestaBorrar("Esto es un error");
  //   expect(component.mensajeRespuesta).toBe("Esto es un error")
  // });

  it(`#actualizar -> Debería llamarse a visibilidadModal, registro debe guardar a solicitud
  y su fecha de ingreso debe ser yyyy-mm-aa, sin tiempo. mostrarContenidoModal debe ser true`, () => {
    // arrange
    const visibilidadModal = spyOn(component, 'visibilidadModal');
    // act
    component.actualizar(solicitud);
    // assert
    expect(visibilidadModal).toHaveBeenCalled();
    expect(component.mostrarContenidoModal).toBeTrue();
    expect(component.registro).toBe(solicitud);
    expect(component.registro.fechaIngreso).toBe('2022-03-03');
  });

  it(`#guardarActualizacion -> Debería llamarse al servicio actualizar, este retorna un obj
    Factura. Tambien se llama a la función asignarId, y mostrar contenido modal debe ser false`, fakeAsync(() => {
    // arrange
    component.construirFormularioProducto();
    const respuestaServicioActualizar = spyOn(guarderiaService, 'actualizar').and.returnValue(of(factura));
    const asignarId = spyOn(component, 'asignarId');
    // act
    component.guardarActualizacion();
    tick(100);
    // assert
    expect(component.factura).toBe(factura);
    expect(asignarId).toHaveBeenCalled();
    expect(respuestaServicioActualizar).toHaveBeenCalled();
    expect(component.mostrarContenidoModal).toBeFalse();
  }));

  it(`#construirFormularioProducto -> Formulario invalido cuando está vacio`, () => {
    // act - assert
    component.construirFormularioProducto();
    expect(component.solicitudForm.valid).toBeFalsy();
  });

  it(`#construirFormularioProducto -> Formulario valido cuando está diligenciado`, () => {
    // act
    component.construirFormularioProducto();
    component.solicitudForm.controls.id.setValue(solicitud.id);
    component.solicitudForm.controls.nombrePropietario.setValue(solicitud.nombrePropietario);
    component.solicitudForm.controls.idPropietario.setValue(solicitud.idPropietario);
    component.solicitudForm.controls.tipoAnimal.setValue(solicitud.tipoAnimal);
    component.solicitudForm.controls.fechaIngreso.setValue(solicitud.fechaIngreso);
    component.solicitudForm.controls.diasEstadia.setValue(solicitud.diasEstadia);
    // assert
    expect(component.solicitudForm.valid).toBeTruthy();
  });

  it(`#asignarId -> id de SolicitudForm debe ser igual a id de registro`, () => {
    // arrange
    component.construirFormularioProducto();
    component.registro = solicitud;
    // act
    component.asignarId();
    // assert
    expect( component.solicitudForm.value.id).toBe(component.registro.id);
  });

  it(`#visibilidadModal -> esVisible alterna su estado y si es true, entonces id de
      solicitudForm es disable`, () => {
    // arrange
    const ID = 'id';
    component.esVisible = false;
    component.construirFormularioProducto();
    // act
    component.visibilidadModal();
    // assert
    expect(component.esVisible).toBeTrue();
    expect(component.solicitudForm.controls[ID].disabled).toBeTrue();
  });
});
