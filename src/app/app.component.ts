import { Component, OnInit } from '@angular/core';
import { Container, Engine } from 'tsparticles-engine';
import {
  MoveDirection,
  ClickMode,
  HoverMode,
  OutMode,
} from "tsparticles-engine";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from 'tsparticles-slim'; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Mi_Web_Frontend';

  constructor() { }

  ngOnInit(): void { }

  id = 'tsparticles';

  /* or the classic JavaScript object */
  particlesOptions = {
    background: {
      color: {
        value: "#000",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
          mode: ClickMode.push,
        },
        onHover: {
          enable: false,
          mode: HoverMode.repulse,
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: false,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: MoveDirection.right,
        enable: true,
        outModes: {
          default: OutMode.out
        },
        random: false,
        speed: 3,
        straight: false,
        angle: {
          offset: 0,
          value: 10
        }
      },
      number: {
        density: {
          enable: true,
          area: 900,
        },
        value: 80,
      },
      opacity: {
        value: 0.6,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 0.5, max: 2.5 },
      },
    },
    detectRetina: true,
  };

  particlesLoaded(container: Container): void {
    // console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    //  console.log(engine);
    await loadSlim(engine);
  }
}
