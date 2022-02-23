import {browser, by, element, protractor} from 'protractor';

export class ProductoPage {
  private linkCrearProducto = element(by.id('linkCrearProducto'));
  private linkListarProductos = element(by.id('linkListarProducto'));

  private inputNombrePropietario = element(by.id('nombrePropietario'));
  private inputIdPropietario = element(by.id('idPropietario'));
  private inputTipoAnimal = element(by.id('tipoAnimal'));
  private inputFechaIngreso = element(by.id('fechaIngreso'));
  private inputDiasEstadia = element(by.id('diasEstadia'));

  private listaProductos = element.all(by.css('table.table.table-responsive.text-center tbody tr'));

  async clickBotonCrearProductos() {
      await this.linkCrearProducto.click();
  }

  async clickBotonListarProductos() {
      await this.linkListarProductos.click();
  }

  async crear() {
    await element(by.id('botonSubmit')).click();
    // Espera hasta que el modal sea visible.
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(element(by.css('div.modal'))), 60000, 'timeout');
    expect(element(by.css('div.modal')).isPresent()).toBe(true);
  }

  async borrar() {
    let idBotonBorrar;
    console.log((await element.all(by.css('.btn.btn-danger')).count()).valueOf());
    await element.all(by.css('.btn.btn-danger')).then(function(botones){
      idBotonBorrar = botones[0];
      botones[0].click();
      // switcheo y enfoco a la alert, para luego aceptar
      browser.switchTo().alert().accept();
    });
    expect(element(by.id('\''+idBotonBorrar.getId()+'\'')).isPresent()).toBe(false);
    console.log((await element.all(by.css('.btn.btn-danger')).count()).valueOf());
  }

  async ejecutarActualizacion() {
    await element.all(by.css('.btn.btn-warning')).then(function(botones){
      botones[0].click();
      expect(element(by.id('formActualizar')).isPresent()).toBe(true);
    });
  }

  async actualizar() {
    await element(by.id('botonSubmit')).click();
    // const EC = protractor.ExpectedConditions;
    // browser.wait(EC.visibilityOf(element(by.id('formActualizar'))), 60000, 'timeout');
    expect(element(by.id('facturacion')).isPresent()).toBe(true);
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

    async contarProductos() {
        return this.listaProductos.count();
    }
}
