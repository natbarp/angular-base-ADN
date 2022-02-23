import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarProductoComponent } from './listar-producto.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { GuarderiaService } from '../../shared/service/guarderia.service';
import { Solicitud } from '../../shared/model/producto';
import { HttpService } from 'src/app/core/services/http.service';

describe('ListarProductoComponent', () => {
  let component: ListarProductoComponent;
  let fixture: ComponentFixture<ListarProductoComponent>;
  let guarderiaService: GuarderiaService;
  const listaProductos: Solicitud[] = [
              new Solicitud('1', 'Test1', '12345', 'PERRO', '2022-03-03 17:00:00', '7'),
              new Solicitud('2', 'Test2', '12345678', 'PERRO', '2022-03-03 17:00:00', '7')
            ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarProductoComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [guarderiaService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProductoComponent);
    component = fixture.componentInstance;
    guarderiaService = TestBed.inject(GuarderiaService);
    spyOn(guarderiaService, 'consultar').and.returnValue(
      of(listaProductos)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaProductos.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});

});
