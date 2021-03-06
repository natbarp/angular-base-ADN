import {browser, by, element, protractor} from 'protractor';

export class GuarderiaPage {
  private linkCrearSolicitud = element(by.id('linkCrearProducto'));
  private linkListarSolicitud = element(by.id('linkListarProducto'));

  // private inputIdPropietarioBuscar = element(by.id('idPropietarioBuscar'));
  private

  private inputNombrePropietario = element(by.id('nombrePropietario'));
  private inputIdPropietario = element(by.id('idPropietario'));
  private inputTipoAnimal = element(by.id('tipoAnimal'));
  private inputFechaIngreso = element(by.id('fechaIngreso'));
  private inputDiasEstadia = element(by.id('diasEstadia'));

  private listaProductos = element.all(by.css('table.table.table-responsive.text-center tbody tr'));

  clickBotonCrearSolicitud() {
    this.linkCrearSolicitud.click();
  }

  clickBotonListarSolicitud() {
    this.linkListarSolicitud.click();
  }

  async crear() {
    await element(by.id('botonSubmit')).click();
    // Espera hasta que el modal sea visible.
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(element(by.css('div.modal'))), 3000, 'timeout');
    return element(by.css('div.modal')).isPresent();
  }

  // objeto para capturar todos los getters
  // get modalPresente(){
  //   return element(by.css('div.modal')).isPresent();
  // }


  async borrar() {
    let idBotonBorrar;
    // console.log((await element.all(by.css('.btn.btn-danger')).count()).valueOf());
    await element.all(by.css('.btn.btn-danger')).then((botones) => {
      idBotonBorrar = botones[0];
      botones[0].click();
      browser.switchTo().alert().accept();  // switcheo y enfoco a la alert, para luego aceptar
    });
    return element(by.id('\'' + idBotonBorrar.getId() + '\'')).isPresent();
  }

  async ejecutarActualizacion() {
    await element.all(by.css('.btn.btn-warning')).then((botones) => {
      botones[0].click();
      expect(element(by.id('formActualizar')).isPresent()).toBe(true);
    });
  }

  async buscar() {
    await element(by.id('botonBuscar')).click();
  }

  async actualizar() {
    await element(by.id('botonSubmit')).click();
    return element(by.id('facturacion')).isPresent();
  }

  async ingresarNombrePropietario(nombrePropietario) {
    await this.inputNombrePropietario.clear();
    await this.inputNombrePropietario.sendKeys(nombrePropietario);
  }

  async ingresarIdPropietario(idPropietario) {
      await this.inputIdPropietario.clear();
      await this.inputIdPropietario.sendKeys(idPropietario);
  }

  async ingresarTipoAnimal(tipoAnimal) {
    await this.inputTipoAnimal.sendKeys(tipoAnimal);
  }

  async ingresarFechaIngreso(fechaIngreso) {
    await this.inputFechaIngreso.clear();
    await this.inputFechaIngreso.sendKeys(fechaIngreso);
  }

  async ingresarDiasEstadia(diasEstadia) {
    await this.inputDiasEstadia.clear();
    await this.inputDiasEstadia.sendKeys(diasEstadia);
  }

  async ingresarIdPropietarioBuscar(number) {
    await element(by.id('idPropietarioBuscar')).clear();
    await element(by.id('idPropietarioBuscar')).sendKeys(number);
  }

  getInputIdPropietarioBuscar() {
    return element(by.id('reg0_idPropietario')).getText();
  }

  async contarProductos() {
      return this.listaProductos.count();
  }
}
