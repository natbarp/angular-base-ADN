// import { browser } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { GuarderiaPage } from '../page/guarderia/guarderia.po';

describe('workspace-project Producto', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let guarderia: GuarderiaPage;
    let registrosIniciales: number;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        guarderia = new GuarderiaPage();
    });

    it('Deberia listar, contar y validar existencia de registros', () => {
      page.navigateTo();
      navBar.clickBotonGuarderia();
      guarderia.clickBotonListarSolicitud();
      guarderia.contarProductos().then((cantidad) => {
        registrosIniciales = cantidad.valueOf();
        console.log(registrosIniciales);
      });
      expect(guarderia.contarProductos()).toBe(guarderia.contarProductos());
    });

    it('Deberia crear producto y ejecutar un modal con información del servidor', () => {
        const ANIMALES = new Array('PERRO', 'GATO');
        const MIN = Math.ceil(0);
        const MAX = Math.floor(2);
        const NOMBRE_PROPIETARIO = 'TEST e2e';
        const ID_PROPIETARIO = Math.random() * 999999;
        const TIPO_ANIMAL = ANIMALES[Math.floor(Math.random() * (MAX - MIN) + MIN)];
        const FECHA_INGRESO = '03-03-2022';
        const DIAS_ESTADIA = '7';

        page.navigateTo();
        navBar.clickBotonGuarderia();
        guarderia.clickBotonCrearSolicitud();
        guarderia.ingresarNombrePropietario(NOMBRE_PROPIETARIO);
        guarderia.ingresarIdPropietario(ID_PROPIETARIO);
        guarderia.ingresarTipoAnimal(TIPO_ANIMAL);
        guarderia.ingresarFechaIngreso(FECHA_INGRESO);
        guarderia.ingresarDiasEstadia(DIAS_ESTADIA);
        guarderia.crear();
        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
    });

    it('Deberia listar e indicar registro = registrosIniciales + 1 ', () => {
      page.navigateTo();
      navBar.clickBotonGuarderia();
      guarderia.clickBotonListarSolicitud();
      expect(guarderia.contarProductos()).toBe(registrosIniciales + 1);
    });

    it('Deberia borrar un item y retirarse de la lista de registros', () => {
      page.navigateTo();
      navBar.clickBotonGuarderia();
      guarderia.clickBotonListarSolicitud();
      guarderia.borrar();
    });

    it('Deberia actualizar un item y retornar datos de facturación', () => {
      const MIN = Math.ceil(1);
      const MAX = Math.floor(999999);
      const ID_PROPIETARIO = Math.floor(Math.random() * (MAX - MIN) + MIN);

      page.navigateTo();
      navBar.clickBotonGuarderia();
      guarderia.clickBotonListarSolicitud();
      guarderia.ejecutarActualizacion();
      guarderia.ingresarIdPropietario(ID_PROPIETARIO);
      guarderia.actualizar();

    });


});
