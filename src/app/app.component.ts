import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [trigger('mostrarBarraB', [
    state('true', style({
      width: 'var(--largura-aberta-b)'
    })),
    state('false', style([{
      width: 'var(--largura-fechada-b)'
    }])),
    transition('false => true', animate('300ms ease-in')),
    transition('true => false', animate('300ms ease-out')),
  ]),
  trigger('mostrarBarraP', [
    state('true', style({
      width: 'var(--largura-aberta-p)'
    })),
    state('false', style([{
      width: 'var(--largura-fechada-p)'
    }])),
    transition('false => true', animate('300ms ease-in')),
    transition('true => false', animate('300ms ease-out')),
  ])]
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  carregando = true;
  mostrarBarra = true;
  antesAbrir = true;
  showFiller = true;
  primeiraMudanca: Boolean = false;
  ngAfterViewInit(): void {
    this.router.events.subscribe((evento) => {
      if (evento instanceof NavigationStart) {
        this.carregando = true;
      } else if (evento instanceof NavigationEnd || evento instanceof NavigationCancel) {
        this.carregando = false;
      }
    });
  }
  mudarEstado(mostrar: boolean) {
    this.mostrarBarra = mostrar;
    if (!this.primeiraMudanca) {
      this.primeiraMudanca = true;
      this.antesAbrir = !this.mostrarBarra ? false : this.antesAbrir;
    }
  }
  finalizarMostrarBarra($event) {
    if (this.mostrarBarra) {
      this.antesAbrir = true;
    }
  }
  antesAbrirBarra(mostrar: boolean) {
    this.antesAbrir = mostrar;
  }
  constructor(private router: Router) {
    this.carregando = true;
  }
}
