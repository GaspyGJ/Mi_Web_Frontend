export class Email {
    //Estructura de un Email

    recipient:string; // direccion email del emisor

    msgBody:string; // mensaje

    subject:string; //asunto
    
    attachment:string; //para archivos adjuntos

    constructor(recipient:string,msgBody:string,subject:string) {
        this.recipient = recipient;
        this.msgBody = msgBody;
        this.subject = subject;
        this.attachment="";
    }

}