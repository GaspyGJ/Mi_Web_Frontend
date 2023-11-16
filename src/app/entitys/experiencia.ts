
export class Experiencia{

    id:number | null = null;

    numeroOrden:number

    titulo:string;

    descripcion:string;

    anioInicio:string;
    
    anioFin:string;

    tipoExperiencia:string;

    tegnologiasUtilizadas:string;

    link:string;

    constructor(titulo:string,numeroOrden:number,descripcion:string,
        anioInicio:string,anioFin:string,tipoExperiencia:string,
        tegnologiasUtilizadas:string,link:string){
            this.titulo=titulo;
            this.descripcion=descripcion;
            this.anioInicio=anioInicio;
            this.anioFin=anioFin;
            this.tipoExperiencia=tipoExperiencia;
            this.tegnologiasUtilizadas=tegnologiasUtilizadas
            this.link=link;
            this.numeroOrden = numeroOrden;
    }

}