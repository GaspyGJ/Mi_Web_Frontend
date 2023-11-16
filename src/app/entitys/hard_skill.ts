export class HardSkill{

    id:number | null = null;;

    titulo:string;

    numeroOrden:number

    icon: string|null;

    altoIcon:number;

    anchoIcon:number;

    constructor(titulo:string,numero_orden:number,
        alto:number,ancho:number,icon:string|null=null){
        this.titulo=titulo;
        this.numeroOrden=numero_orden;
        this.altoIcon=alto;
        this.anchoIcon=ancho;
        this.icon=icon;    
    }
}