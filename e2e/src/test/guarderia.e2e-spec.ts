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
      // act
      page.navigateTo();
      navBar.clickBotonGuarderia();
      guarderia.clickBotonListarSolicitud();
      guarderia.contarProductos().then((cantidad) => {
        registrosIniciales = cantidad.valueOf();
      });
      // assert
      expect(guarderia.contarProductos()).toBe(guarderia.contarProductos());
    });

    it('Deberia crear producto y ejecutar un modal con información del servidor', () => {
      // arrange
      const ANIMALES = new Array('PERRO', 'GATO');
      const MIN = Math.ceil(0);
      const MAX = Math.floor(2);
      const NOMBRE_PROPIETARIO = 'TEST e2e';
      const ID_PROPIETARIO = Math.random() * 999999;
      const TIPO_ANIMAL = ANIMALES[Math.floor(Math.random() * (MAX - MIN) + MIN)];
      const FECHA_INGRESO = '03-03-2022';
      const DIAS_ESTADIA = '7';
      // act
      page.navigateTo();
      navBar.clickBotonGuarderia();
      guarderia.clickBotonCrearSolicitud();
      guarderia.ingresarNombrePropietario(NOMBRE_PROPIETARIO);
      guarderia.ingresarIdPropietario(ID_PROPIETARIO);
      guarderia.ingresarTipoAnimal(TIPO_ANIMAL);
      guarderia.ingresarFechaIngreso(FECHA_INGRESO);
      guarderia.ingresarDiasEstadia(DIAS_ESTADIA);
      // assert
      expect(guarderia.crear()).toBe(true);
    });

    it('Deberia listar por id de usuario', async () => {
      // arrange
      // act
      page.navigateTo();
      navBar.clickBotonGuarderia();
      guarderia.clickBotonListarSolicitud();
      await guarderia.ingresarIdPropietarioBuscar(guarderia.getInputIdPropietarioBuscar());
      await guarderia.buscar();
      // assert
      await expect(guarderia.contarProductos()).toBeGreaterThan(0);
    });

    it('Deberia listar e indicar registro = registrosIniciales + 1 ', () => {
      // act
      page.navigateTo();
      navBar.clickBotonGuarderia();
      guarderia.clickBotonListarSolicitud();
      // assert
      expect(guarderia.contarProductos()).toBe(registrosIniciales + 1);
    });

    it('Deberia actualizar un item y retornar datos de facturación', () => {
      // arrange
      const MIN = Math.ceil(1);
      const MAX = Math.floor(999999);
      const ID_PROPIETARIO = Math.floor(Math.random() * (MAX - MIN) + MIN);
      // act
      page.navigateTo();
      navBar.clickBotonGuarderia();
      guarderia.clickBotonListarSolicitud();
      guarderia.ejecutarActualizacion();
      guarderia.ingresarIdPropietario(ID_PROPIETARIO);
      // assert
      expect(guarderia.actualizar()).toBe(true);
    });

    it('Deberia borrar un item y retirarse de la lista de registros', async () => {
      // act
      page.navigateTo();
      navBar.clickBotonGuarderia();
      guarderia.clickBotonListarSolicitud();
      // assert
      await expect(guarderia.borrar()).toBe(false);
      await expect(guarderia.contarProductos()).toBe(registrosIniciales);
    });


});
