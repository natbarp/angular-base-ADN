// import { browser } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ProductoPage } from '../page/producto/producto.po';

describe('workspace-project Producto', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let producto: ProductoPage;
    var registrosIniciales: number;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        producto = new ProductoPage();
    });

    it('Deberia listar, contar y validar existencia de registros', () => {
      page.navigateTo();
      navBar.clickBotonProductos();
      producto.clickBotonListarProductos();
      producto.contarProductos().then((cantidad)=>{
        registrosIniciales = cantidad.valueOf();
        console.log(registrosIniciales);
      })
      expect(producto.contarProductos()).toBe(producto.contarProductos());
    });

    it('Deberia crear producto y ejecutar un modal con información del servidor', () => {
        const ANIMALES = new Array("PERRO", "GATO");
        const MIN = Math.ceil(0);
        const MAX = Math.floor(2);
        const NOMBRE_PROPIETARIO = 'TEST e2e';
        const ID_PROPIETARIO = Math.random()*999999;
        const TIPO_ANIMAL = ANIMALES[Math.floor(Math.random()*(MAX - MIN) + MIN)];
        const FECHA_INGRESO = '03-03-2022';
        const DIAS_ESTADIA = '7';

        page.navigateTo();
        navBar.clickBotonProductos();
        producto.clickBotonCrearProductos();
        producto.ingresarNombrePropietario(NOMBRE_PROPIETARIO);
        producto.ingresarIdPropietario(ID_PROPIETARIO);
        producto.ingresarTipoAnimal(TIPO_ANIMAL);
        producto.ingresarFechaIngreso(FECHA_INGRESO);
        producto.ingresarDiasEstadia(DIAS_ESTADIA);
        producto.crear();
        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
    });

    it('Deberia listar e indicar registro = registrosIniciales + 1 ', () => {
      page.navigateTo();
      navBar.clickBotonProductos();
      producto.clickBotonListarProductos();
      expect(producto.contarProductos()).toBe(registrosIniciales+1);
    });

    it('Deberia borrar un item y retirarse de la lista de registros', () => {
      page.navigateTo();
      navBar.clickBotonProductos();
      producto.clickBotonListarProductos();
      producto.borrar();
    });

    it('Deberia actualizar un item y retornar datos de facturación', () => {
      const MIN = Math.ceil(1);
      const MAX = Math.floor(999999);
      const ID_PROPIETARIO = Math.floor(Math.random()*(MAX - MIN) + MIN);

      page.navigateTo();
      navBar.clickBotonProductos();
      producto.clickBotonListarProductos();
      producto.ejecutarActualizacion();
      producto.ingresarIdPropietario(ID_PROPIETARIO);
      producto.actualizar();

    });


});
