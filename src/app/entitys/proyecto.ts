import { Archivo } from "./Archivo";

export class Proyecto{

    id:number | null = null;


    numeroOrden:number

    descripcion:string;
    
    titulo:string;

    gitHubWeb:string;

    direccionWeb:string;

    imagenes:Archivo[];

    constructor_sin_imagen(titulo:string,numeroOrden:number,descripcion:string,
        gitHubWeb:string,direccionWeb:string){
            this.titulo=titulo;
            this.numeroOrden=numeroOrden;
            this.descripcion=descripcion;
            this.gitHubWeb=gitHubWeb;
            this.direccionWeb=direccionWeb;
    }

    constructor(titulo:string,numeroOrden:number,
        descripcion:string,gitHubWeb:string,
        direccionWeb:string,imagenes:Archivo[]){
        this.titulo=titulo;
        this.numeroOrden=numeroOrden;
        this.descripcion=descripcion;
        this.gitHubWeb=gitHubWeb;
        this.direccionWeb=direccionWeb;
        this.imagenes=imagenes;
    }

}