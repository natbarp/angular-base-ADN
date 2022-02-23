import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/ul/li[1]/a'));
    linkGuarderia = element(by.xpath('/html/body/app-root/app-navbar/nav/ul/li[2]/a'));

    async clickBotonGuarderia() {
      await this.linkGuarderia.click();
    }
}
