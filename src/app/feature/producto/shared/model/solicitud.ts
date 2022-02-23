export class Solicitud {
    id: string;
    nombrePropietario: string;
    idPropietario: string;
    tipoAnimal: string;
    fechaIngreso: string;
    diasEstadia: string;


    constructor(id: string, nombrePropietario: string, idPropietario: string, tipoAnimal: string, fechaIngreso: string, diasEstadia: string) {
        this.id = id;
        this.nombrePropietario = nombrePropietario;
        this.idPropietario = idPropietario;
        this.tipoAnimal = tipoAnimal;
        this.fechaIngreso = fechaIngreso;
        this.diasEstadia = diasEstadia;
    }
}
