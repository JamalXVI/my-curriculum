import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-circulo',
  templateUrl: './circulo.component.html',
  styleUrls: ['./circulo.component.css'],
  animations: [
    trigger('circulo', [
      state('void', style({ transform: 'translateX(0px) scale(0)' })),
      state('final', style({
        transform: 'translateX(0px) scale(1)'
      })),
      transition('* => final', animate('800ms'))
    ]),
    trigger('caixa', [
      state('void', style({
        display: 'none'
      })),
      state('inicio', style({
        display: 'initial',
        transform: 'translateX(0px) scaleX(0)'
      })),
      state('aparecer', style({
        display: 'initial',
        transform: 'translateX(0px) scaleX(0.5)'
      })),
      state('final', style({
        display: 'initial',
        color: 'white',
        transform: 'translateX(0px) scaleX(1)'
      })),
      transition('* => final', animate('300ms'))
    ]),
    trigger('divImage', [
      state('void', style({
        display: 'none'
      })),
      state('inicio', style({
        display: 'none'
      })),
      state('aparecer', style({
        display: 'initial',
        transform: 'translateX(0px) scaleY(0.1)'
      })),
      state('final', style({
        transform: 'translateX(0px) scaleY(1)'
      })),
      transition('* => final', animate('200ms'))
    ]),
  ]
})
export class CirculoComponent implements OnInit, AfterViewInit {
  public estado: String = 'final';
  public estadoCaixa: String = 'inicio';
  public estadoDivImagem: String = 'inicio';
  @Output() finalizouAnimacoes: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
  }
  finalizouAnimacaoCirculo($event) {
    this.estadoDivImagem = 'aparecer';
    this.estadoCaixa = 'aparecer';
  }
  finalizouAnimacaoCaixa($event) {
    switch (this.estadoCaixa) {
      case 'aparecer':
        this.estadoCaixa = 'final';
        this.estadoDivImagem = 'final';
        break;
      case 'final':

        break;
    }
  }
  finalizouAnimacoesIntroducao($event) {
    if (this.estadoDivImagem === 'final') {
      this.finalizouAnimacoes.emit(true);
    }
  }
}
