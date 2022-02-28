import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GuarderiaService } from './guarderia.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Solicitud } from '../model/solicitud';
import { HttpResponse } from '@angular/common/http';
import { Factura } from '../model/factura';

describe('ProductoService', () => {
  let httpMock: HttpTestingController;
  let service: GuarderiaService;
  const apiEndpointGuarderiaConsulta = `${environment.endpoint}/listar`;
  const apiEndpointCrear = `${environment.endpoint}/crear`;
  const apiEndpointActualizar = `${environment.endpoint}/actualizar`;
  const apiEndpointBorrar = `${environment.endpoint}/borrar`;
  const dummyfactura = new Factura({
    descuento: false,
    diasEstadia: 7,
    valorDiaRegular: 30000.0,
    valorDiaFDS: 34500.0,
    valorFacturado: 219000.0
  });
  const dummySolicitud = new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03', '7');
  const dummySolicitud2 = new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03 00:00:00', '7');

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GuarderiaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(GuarderiaService);
  });

  it('should be created', () => {
    // const guarderiaService: GuarderiaService = TestBed.inject(GuarderiaService);
    expect(service).toBeTruthy();
  });

  it('#consultar -> deberia listar productos', () => {
    const dummyProductos = [
      new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03 17:00:00', '7'), new Solicitud('2', 'Test2', '12345678', 'PERRO', '2022-03-03 17:00:00', '7')
    ];
    service.consultar().subscribe(solicitudes => {
      expect(solicitudes.length).toBe(2);
      expect(solicitudes).toEqual(dummyProductos);
    });
    const req = httpMock.expectOne(apiEndpointGuarderiaConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductos);
  });

  it('#consultar -> deberia listar productos teniendo en cuenta id buscado', () => {
    const idConsulta = '12345';
    const dummyProductos = [
      new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03 17:00:00', '7')
    ];
    service.consultar(idConsulta).subscribe(solicitudes => {
      expect(solicitudes.length).toBe(1);
      expect(solicitudes).toEqual(dummyProductos);
    });
    const req = httpMock.expectOne(apiEndpointGuarderiaConsulta+'/'+idConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductos);
  });

  it('#guardar -> deberia crear un producto ajustando su fecha', () => {
    const solicitud = new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03', '7');
    service.guardar(solicitud).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyfactura);
    });
    const req = httpMock.expectOne(apiEndpointCrear);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<Factura>({body: dummyfactura}));
    expect(solicitud.fechaIngreso).toBe('2022-03-03 00:00:00');
  });

  it('#guardar -> deberia crear un producto sin ajustar fecha', () => {
    service.guardar(dummySolicitud2).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyfactura);
    });
    const req = httpMock.expectOne(apiEndpointCrear);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<Factura>({body: dummyfactura}));
    expect(dummySolicitud2.fechaIngreso).toBe('2022-03-03 00:00:00');
  });

  it('#actualizar -> deberia actualizar un producto ajustando su fecha', () => {
    const solicitud = new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03', '7');
    service.actualizar(solicitud).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyfactura);
    });
    const req = httpMock.expectOne(`${apiEndpointActualizar}/1`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<Factura>({body: dummyfactura}));
    expect(solicitud.fechaIngreso).toBe('2022-03-03 00:00:00');
  });

  it('#actualizar -> deberia actualizar un producto sin ajustar su fecha', () => {
    service.actualizar(dummySolicitud2).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyfactura);
    });
    const req = httpMock.expectOne(`${apiEndpointActualizar}/1`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<Factura>({body: dummyfactura}));
    expect(dummySolicitud2.fechaIngreso).toBe('2022-03-03 00:00:00');
  });

  it('#eliminar -> deberia eliminar un producto', () => {
    service.eliminar(+dummySolicitud.id).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointBorrar}/` + dummySolicitud.id);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
