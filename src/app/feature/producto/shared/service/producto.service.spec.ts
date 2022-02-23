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

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GuarderiaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(GuarderiaService);
  });

  it('should be created', () => {
    const productService: GuarderiaService = TestBed.inject(GuarderiaService);
    expect(productService).toBeTruthy();
  });

  it('deberia listar productos', () => {
    const dummyProductos = [
      new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03 17:00:00', '7'), new Solicitud('2', 'Test2', '12345678', 'PERRO', '2022-03-03 17:00:00', '7')
    ];
    service.consultar().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(dummyProductos);
    });
    const req = httpMock.expectOne(apiEndpointGuarderiaConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductos);
  });

  it('deberia crear un producto', () => {
    const dummyProducto = new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03 17:00:00', '7');
    service.guardar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(new Factura(false,4,35000.0,40250.0,150500.0));
    });
    const req = httpMock.expectOne(apiEndpointCrear);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia actualizar un producto', () => {
    const dummyProducto = new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03 17:00:00', '7');
    service.actualizar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(new Factura(false,4,35000.0,40250.0,150500.0));
    });
    const req = httpMock.expectOne(`${apiEndpointActualizar}/1`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar un producto', () => {
    const dummyProducto = new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03 17:00:00', '7');
    service.eliminar(+dummyProducto.id).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointBorrar}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
