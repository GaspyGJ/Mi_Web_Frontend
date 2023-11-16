import { Component, OnInit } from '@angular/core';
import Card3d from 'card3d';

@Component({
  selector: 'app-card3-d',
  templateUrl: './card3-d.component.html',
  styleUrls: ['./card3-d.component.css']
})
export class Card3DComponent implements OnInit{
  
  card:Card3d | null = null;
  
  ngOnInit(): void {
    this.card = new Card3d(
      document.querySelector('.card3D')!, 
      { glare: true, glareOpacity: 0.3 }
      );
      this.card.start();
    }
}
