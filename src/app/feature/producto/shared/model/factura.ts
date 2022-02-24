
export class Factura {
  valor: {
    descuento: boolean;
    diasEstadia: number;
    valorDiaRegular: number;
    valorDiaFDS: number;
    valorFacturado: number;
  };

  // constructor(descuento: boolean,diasEstadia: number, valorDiaRegular: number, valorDiaFDS: number, valorFacturado: number) {
  //   this.valor.descuento = descuento;
  //   this.valor.diasEstadia = diasEstadia;
  //   this.valor.valorDiaRegular = valorDiaRegular
  //   this.valor.valorDiaFDS = valorDiaFDS
  //   this.valor.valorFacturado = valorFacturado
  // }

  constructor(valor){
    this.valor = valor;
  }
}


