import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Educacion } from 'src/app/entitys/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { years } from 'src/app/Util/anios';

@Component({
  selector: 'app-add-educacion',
  templateUrl: './add-educacion.component.html',
  styleUrls: ['./add-educacion.component.css']
})
export class AddEducacionComponent implements OnInit {

  default: Educacion;

  yearsList = years;

  pdfDataBase64: string | null = null;

  constructor(private educacionService: EducacionService, private referencia: MatDialogRef<AddEducacionComponent>) {
    this.default = new Educacion("Titulo Ejemplo 1", -1, "Descripcion Ejemplo 1", "2022", "2022", "Cursando", "");
  }

  ngOnInit(): void { }


  protected obtenerArchivo(event: any): void {
    const archivoCapturado = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const pdf = reader.result as string;
      this.pdfDataBase64 = pdf.replace(/^data:application\/\w+;base64,/, "").replace(/^image\/\w+;base64,/, "");
    }
    reader.readAsDataURL(archivoCapturado);
  }

  protected guardarEducacion(titulo: string, descripcion: string, anioStart: string, anioEnd: string, estadoActual: string) {

    const educacion: Educacion = new Educacion(titulo, -1, descripcion, anioStart, anioEnd, estadoActual, this.pdfDataBase64);

    this.educacionService.save(educacion).subscribe({
      next: (dato) => {
        window.alert(dato.message);
        this.referencia.close("Cerrando");
      },
      error: (error) => {
        window.alert("ERROR, revisar entradas");
        console.error(error);
      }
    });

  }

}





