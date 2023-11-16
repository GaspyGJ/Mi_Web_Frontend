import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Email } from 'src/app/entitys/Email/email';
import { EmailServiceService } from 'src/app/service/Email/email-service.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  dialogTitle = "No se pudo ingresar";
  dialogDescription = "";
  dialogIcon = "error_outline";
  sending: boolean = false;

  constructor(private router: Router, private emailService: EmailServiceService) { }

  ngOnInit(): void {
    this.addAnimacionIn();
  }

  addAnimacionIn() {
    const element = document.getElementsByClassName('container-seccion');
    element[0].classList.add('container-seccion-animacion-in');
  }
  volver() {
    const element = document.getElementsByClassName('container-seccion');
    element[0].classList.remove('container-seccion-animacion-in');
    element[0].classList.add('container-seccion-animacion-out');
    setTimeout(() => {
      this.router.navigate(['/navegacion']);
    }, 1000);
  }


  onSubmit(dir_email: string, body: string, subject: string) {
    let email: Email = new Email(dir_email, body, subject);

    this.emailService.sendEmail(email).subscribe({
      next: (response) => {
        this.closeDialog();
        this.sending = false;
        let statusEmail = response;
        if (statusEmail.StatusMeEmail == "E-mail Sent Successfully" && statusEmail.StatusResponseEmail == "E-mail Sent Successfully") {
          this.openDialog("E-mail enviado", "", "check_circle_outline");
        }
        else {
          this.openDialog("No se pudo enviar el e-mail", ":(", "error_outline");
        }

      },
      error: (e) => {
        this.closeDialog();
        this.sending = false;
        this.openDialog("No se pudo enviar el e-mail", e.error.message, "error_outline");
      }
    });
    this.sending = true;
    this.openDialog('Enviando...', "Espere a que termine el envio", "");
  }

  openDialog(titulo: string, description: string, icon: string) {
    this.dialogTitle = titulo;
    this.dialogDescription = description;
    this.dialogIcon = icon;
    const dialog = <HTMLDialogElement>document.getElementById("dialog-login");
    dialog.showModal();
  }
  closeDialog() {
    const dialog = <HTMLDialogElement>document.getElementById("dialog-login");
    dialog.close();
  }

}
