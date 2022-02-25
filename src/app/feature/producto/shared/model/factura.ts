
export class Factura {
  valor: {
    descuento: boolean;
    diasEstadia: number;
    valorDiaRegular: number;
    valorDiaFDS: number;
    valorFacturado: number;
  };

  constructor(valor){
    this.valor = valor;
  }
}


