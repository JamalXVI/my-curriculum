import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-botao-hamburger',
  templateUrl: './botao-hamburger.component.html',
  styleUrls: ['./botao-hamburger.component.css'],
  animations: [trigger('estado1', [
    state('true', style({ transform: 'rotate(0deg)', top: '10px' })),
    state('false', style({ transform: 'rotate(135deg)', top: '22px' })),
    transition('* => *', animate('150ms ease-out'))
  ]),
  [trigger('estado2', [
    state('true', style({ left: '10%', opacity: '1' })),
    state('false', style({ left: '-60px', opacity: '0' })),
    transition('* => *', animate('100ms ease-out'))
  ])],
  [trigger('estado3', [
    state('true', style({ transform: 'rotate(0deg)', top: '34px' })),
    state('false', style({ transform: 'rotate(45deg)', top: '22px' })),
    transition('* => *', animate('100ms ease-out'))
  ])]
  ]
})
export class BotaoHamburgerComponent implements OnInit {
  estado = false;
  @ViewChild('barra') barra: ElementRef;
  @Output() aberta: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() antesAbrir: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {
    this.alterarEstado(!(window.innerWidth > 600));
  }

  ngOnInit() {
  }
  mudarEstado() {
    this.alterarEstado(!this.estado);
  }
  alterarEstado(valor: boolean) {
    this.estado = valor;
    if (this.estado) {
      this.antesAbrir.emit(!this.estado);
    }
  }
  finalizarAnimacao() {
    this.aberta.emit(!this.estado);
  }
  @HostListener('window:resize', ['$event'])
  mudarTamanho($event) {
    const largura: number = +$event.target.innerWidth;
    if (largura && largura > 600) {
      this.alterarEstado(false);
    }
  }
}
