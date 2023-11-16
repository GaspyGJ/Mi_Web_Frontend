import { Component, OnInit } from '@angular/core';
import { isElementInViewport } from 'src/app/service/HandlerAnimation/generalAnimation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  icon: string = 'keyboard_arrow_down';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.animarCard(null);
  }

  animarCard(card: HTMLElement | null) {
    if (card == null) {
      card = document.getElementById('app-card-3d');
    }
    const cardDescription = document.getElementsByClassName('card-description');
    const cardSubtitle = document.getElementsByClassName('card-subtitle');
    const cardTitle = document.getElementsByClassName('card-title');
    const cardSello = document.getElementsByClassName('card-img');
    const cardFoto = document.getElementsByClassName('card-img-foto');

    card!.classList.add('app-card-3d-animado');
    cardDescription[0]!.classList.add('card-description-animado');
    cardSubtitle[0]!.classList.add('card-subtitle-animado');
    cardTitle[0]!.classList.add('card-title-animado');
    cardSello[0]!.classList.add('card-sello-animado');
    cardFoto[0]!.classList.add('card-img-foto-animado');
    this.icon = 'keyboard_arrow_down';
  }

  /*
  desanimarCard(card: HTMLElement | null) {
    if (card == null) {
      card = document.getElementById('app-card-3d');
    }
    const cardDescription = document.getElementsByClassName('card-description');
    const cardSubtitle = document.getElementsByClassName('card-subtitle');
    const cardTitle = document.getElementsByClassName('card-title');
    const cardSello = document.getElementsByClassName('card-img');
    const cardFoto = document.getElementsByClassName('card-img-foto');
    card!.classList.remove('app-card-3d-animado');
    cardDescription[0]!.classList.remove('card-description-animado');
    cardSubtitle[0]!.classList.remove('card-subtitle-animado');
    cardTitle[0]!.classList.remove('card-title-animado');
    cardSello[0]!.classList.remove('card-sello-animado');
    cardFoto[0]!.classList.remove('card-img-foto-animado');
  }
  */

  linkToIngresar() {
    this.router.navigate(['/login']);
  }
  linkToNavegacion() {
    this.router.navigate(['/navegacion']);
  }

}
