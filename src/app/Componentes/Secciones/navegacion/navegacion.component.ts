import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  icon: string = 'keyboard_arrow_up';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.animarBento();
    setTimeout(() => {
      const body = document.getElementsByTagName("body");
      body[0].style.overflow = "visible";
    }, 3000)
  }

  animarBento() {
    const body = document.getElementsByTagName("body");
    body[0].style.overflow = "hidden";
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach((bentoItem) => {
      bentoItem.classList.add('bento-animated');
      this.icon = 'keyboard_arrow_up';
    });
  }

  desanimarBento() {
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach((bentoItem) => {
      bentoItem.classList.remove('bento-animated');
    });
  }

  linkToHome() {
    this.router.navigate([""]);
  }
}
