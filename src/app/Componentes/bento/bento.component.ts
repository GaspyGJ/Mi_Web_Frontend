import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { isElementInViewport } from 'src/app/service/HandlerAnimation/generalAnimation';
@Component({
  selector: 'app-bento',
  templateUrl: './bento.component.html',
  styleUrls: ['./bento.component.css'],
})
export class BentoComponent implements OnInit, AfterViewInit{
  seccion: string = '';

  @ViewChild('Experiencia') 
  private experiencia!: ElementRef;
  @ViewChild('Educacion') 
  private educacion!: ElementRef;
  @ViewChild('Proyectos') 
  private proyectos!: ElementRef;
  @ViewChild('Habilidades') 
  private habilidades!: ElementRef;
  @ViewChild('CV') 
  private cv!: ElementRef;
  @ViewChild('Github') 
  private github!: ElementRef;
  @ViewChild('Linkedin') 
  private linkedin!: ElementRef;
  @ViewChild('Contacto') 
  private contacto!: ElementRef;

  constructor(private router: Router) {
  }

  ngAfterViewInit() {
    this.setListeners();
  }
  
  ngOnInit(): void {
    this.addAnimation();
  }

  setListeners() {
    const elements = [
      this.experiencia,
      this.educacion,
      this.proyectos,
      this.habilidades,
      this.cv,
      this.github,
      this.linkedin,
      this.contacto,
    ];

    elements.forEach((element) => {
      
      element.nativeElement.addEventListener('mouseover', () => {
        this.seccion = element.nativeElement.name;
      });
      element.nativeElement.addEventListener('mouseout', () => {
        this.seccion = '';
      });
    });
   
  }

  linkToExperiencia() {
    this.router.navigate(['/experiencia']);
  }
  linkToEducacion() {
    this.router.navigate(['/educacion']);
  }
  linkToProyectos() {
    this.router.navigate(['/proyectos']);
  }
  linkToHabilidades() {
    this.router.navigate(['/habilidades']);
  }
  linkToLogin() {
    this.router.navigate(['/login']);
  }
  linkToContacto() {
    this.router.navigate(['/contacto']);
  }

  private addAnimation() {
    const bento = document.getElementById('bento-grid');
    const bentoItems = document.querySelectorAll('.bento-item');
    if (isElementInViewport(bento)) {
      bento?.classList.add('bento-grid-animated-return');
      bentoItems.forEach((bentoItem) => {
        bentoItem.classList.add('bento-animated');
      });
    }
  }
}
