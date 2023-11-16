import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Educacion } from 'src/app/entitys/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { years } from 'src/app/Util/anios';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent implements OnInit {

  educacion: Educacion | null = null;

  id: number;

  yearsList = years;

  pdfDataBase64: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public params: any, private referencia: MatDialogRef<EditEducacionComponent>, private educacionService: EducacionService) {
    this.id = Number(this.params.id)

    this.educacionService.getById(this.id).subscribe(dato => {
      this.educacion = dato;
    })
  }

  protected obtenerArchivo(event: any): void {
    const archivoCapturado = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const pdf = reader.result as string;
      this.pdfDataBase64 = pdf.replace(/^data:application\/\w+;base64,/, "").replace(/^image\/\w+;base64,/, "");
    }
    reader.readAsDataURL(archivoCapturado);
  }


  ngOnInit(): void { }

  protected actualizar(titulo: string, descripcion: string, anioStart: string, anioEnd: string, estadoActual: string) {

    let educacion = new Educacion(titulo, -1, descripcion, anioStart, anioEnd, estadoActual, this.pdfDataBase64);

    educacion.id = this.educacion!.id;

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