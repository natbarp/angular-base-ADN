
export class Factura {
  valor: {
    descuento: boolean;
    diasEstadia: string;
    valorDiaRegular: string;
    valorDiaFDS: string;
    valorFacturado: string;
  }

  constructor(valor) {
    this.valor = valor;
  }
}
