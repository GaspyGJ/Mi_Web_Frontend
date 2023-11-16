import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Archivo } from 'src/app/entitys/Archivo';
import { Persona } from 'src/app/entitys/persona';
import { PersonaService } from 'src/app/service/persona.service';


@Component({
  selector: 'app-edit-about-me',
  templateUrl: './edit-about-me.component.html',
  styleUrls: ['./edit-about-me.component.css']
})
export class EditAboutMeComponent implements OnInit {
  ngOnInit(): void {}
/*
  personas: Persona[] | null = null;

  foto: Archivo | null = null;

  constructor(private referencia: MatDialogRef<EditAboutMeComponent>, private personaService: PersonaService){
    this.obtenerPersona();
   }

  

  private obtenerPersona() {
    this.personaService.get().subscribe(dato => {
      this.personas = dato;
      this.foto = this.personas[0].foto;
    })
  }

  protected obtenerArchivo(event:any):void{
    const archivoCapturado = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivoCapturado);
    reader.onload = () => {
      var blob = new Blob([<ArrayBuffer>reader.result]);
      this.foto= new Archivo("image",blob)
    }
  }

  public actualizar(nombre: String, apellido: String, edad: String,
    domicilio: String, nombrePuesto: String, descripcion: String) {

    let ok: boolean = false;

    if (nombre != "" && apellido != "" && edad != "" && Number(edad) > 18 && Number(edad) < 99 && domicilio != "" && nombrePuesto != "" && descripcion != "") {
      ok = true;
    }
    else {
      ok = false;
    }
    if (ok && this.foto!==null) {
      const persona:Persona = new Persona(this.personas![0].id, nombre, apellido, Number(edad),
       domicilio, nombrePuesto, descripcion, this.foto);

      this.personaService.save(persona).subscribe({
        next:(dato)=>{
          window.alert("Creado correctamente");
          this.referencia.close("Cerrando");
        },
        error:(error)=>{
          window.alert("ERROR, revisar entradas");
        }
      });
    }
    else {
      window.alert("ERROR, entradas invalidas");
    }


  }
*/
}
