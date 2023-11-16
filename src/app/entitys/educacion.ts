
export class Educacion {

    id: number | null = null;

    numeroOrden: number

    titulo: string;

    descripcion: string;

    anioInicio: string;

    anioFin: string;

    estado: string;

    certificado: string | null;

    constructor(titulo: string, numero_orden: number, descripcion: string, anioInicio: string, anioFin: string, estadoActual: string, certificado: string | null = null) {
        this.titulo = titulo;
        this.numeroOrden = numero_orden;
        this.descripcion = descripcion;
        this.anioInicio = anioInicio;
        this.anioFin = anioFin;
        this.estado = estadoActual;
        this.certificado = certificado;
    }

}