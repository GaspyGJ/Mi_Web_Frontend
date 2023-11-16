import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Archivo } from 'src/app/entitys/Archivo';
import { Proyecto } from 'src/app/entitys/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-add-proyecto',
  templateUrl: './add-proyecto.component.html',
  styleUrls: ['./add-proyecto.component.css']
})
export class AddProyectoComponent implements OnInit {

  default:Proyecto;

  listaImagenes: Archivo[] = [] ;
  listaImagenesSinCabecera: string[] = [] ;
  listaimagenSeleccionadaEnBase64: string[] = [] ;

  constructor(private proyectoService:ProyectoService,private referencia: MatDialogRef<AddProyectoComponent>) { 
    this.default= new Proyecto('Titulo',-1,'Descripcion','urlGitHub','urlAppWeb',this.listaImagenes);
  }

  ngOnInit(): void {}

  protected addFoto(){
    if(this.listaImagenesSinCabecera[this.listaImagenesSinCabecera.length-1]!==undefined){
      const imagen = this.listaImagenesSinCabecera[this.listaImagenesSinCabecera.length-1];
      const archivoNew = new Archivo("image", imagen);
      this.listaImagenes.push(archivoNew);
    }     
  }

  //No funcionaba y COMENTE EL HTML
  protected dropFoto(imagen:string){
    let index = this.listaImagenes.findIndex(element=> element.archivo === imagen.replace(/^data:image\/\w+;base64,/, ""));
    this.listaImagenes.splice(index,1);
  }

  protected obtenerArchivo(event:any):void{
    const archivoCapturado = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imagenBase64 = reader.result as string; 
       //la de abajo es para mostrarla en pantalla
      this.listaimagenSeleccionadaEnBase64.push(imagenBase64);
      //esta es porq asi requiele las imagenes la bbdd
      this.listaImagenesSinCabecera.push(imagenBase64.replace(/^data:image\/\w+;base64,/, ""));
    }

    reader.readAsDataURL(archivoCapturado);
  }

  protected guardarProyecto(titulo:string,descripcion:string,urlGitHub:string,urlAppWeb:string){
  
    const proyecto:Proyecto = new Proyecto(titulo,-1,descripcion,urlGitHub,urlAppWeb,this.listaImagenes);
    this.proyectoService.save(proyecto).subscribe({
      next:(dato)=>{
        window.alert(dato.message);
        this.referencia.close("Cerrando");
      },
      error:(error)=>{
        window.alert("ERROR, revisar entradas");
        console.error(error);
      }
    });

  }
  

}
