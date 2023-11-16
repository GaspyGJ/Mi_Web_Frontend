import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Archivo } from 'src/app/entitys/Archivo';
import { Proyecto } from 'src/app/entitys/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  proyecto:Proyecto | null = null;

  id: number;

  listaImagenes: Archivo[] = [] ;
  listaImagenesData: string[] = [] ;
  imagenSeleccionadaBase64 : string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public params:any, private referencia:MatDialogRef<EditProyectoComponent>,
  private proyectoService: ProyectoService) {
    this.id= Number(this.params.id);

    this.proyectoService.getById(this.id).subscribe(dato => {
      this.proyecto = dato;
      this.listaImagenes=this.proyecto.imagenes;
      this.listaImagenes.forEach((imagen)=>{
        imagen.archivo= "data:image/png;base64,"+imagen.archivo;
        this.listaImagenesData.push(imagen.archivo);
      })

    })
   }

  ngOnInit(): void {}

  protected addFoto(){
    if(this.listaImagenesData.at(this.listaImagenesData.length)!=undefined){
      const imagen = this.listaImagenesData.at(this.listaImagenesData.length);
      const archivoNew = new Archivo("image", imagen!);
      this.listaImagenes?.push(archivoNew);
    }     
  }
  protected dropFoto(imagen:Archivo){
    let index = this.listaImagenes.findIndex(element=> element.archivo === imagen.archivo);
    this.listaImagenes.splice(index,1);
  }

  protected obtenerArchivo(event:any):void{
    const archivoCapturado = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      //la de abajo es para mostrarla en pantalla
      this.imagenSeleccionadaBase64 = reader.result as string; 
      //esta es porq asi requiele las imagenes la bbdd
      this.listaImagenesData.push(this.imagenSeleccionadaBase64.replace(/^data:image\/\w+;base64,/, ""));
    }
    reader.readAsDataURL(archivoCapturado);
  }
  protected actualizar(titulo:string,descripcion:string,urlGitHub:string,urlAppWeb:string){
   
    let proyecto = new Proyecto(titulo,-1,descripcion,urlGitHub,urlAppWeb,this.listaImagenes);
    proyecto.id = this.proyecto!.id;

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

