import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/ul/li[1]/a'));
    linkProducto = element(by.xpath('/html/body/app-root/app-navbar/nav/ul/li[2]/a'));

    async clickBotonProductos() {
      await this.linkProducto.click();
    }
}
