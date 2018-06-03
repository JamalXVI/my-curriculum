import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Jogo } from '../../nucleo/jogo.model';

@Component({
  selector: 'app-botao-jogo',
  templateUrl: './botao-jogo.component.html',
  styleUrls: ['./botao-jogo.component.css'],
  animations: [trigger('animarBotao', [state('0', style({
    opacity: '0',
    'margin-top': '20vh',
    background: '#F44336',
    display: 'none'
  })),
  state('1', style({
    opacity: '0.9',
    'margin-top': '0px',
    background: '#F44336',
    display: 'inherit'
  })),
  state('2', style({
    opacity: '0.9',
    'margin-top': '0px',
    background: '#EF5350',
    display: 'inherit'
  })),
  state('3', style({
    opacity: '0.9',
    'margin-top': '0px',
    background: '#C62828',
    display: 'inherit'
  })),
  state('4', style({
    opacity: '0.9',
    'margin-top': '0px',
    background: '#F44336',
    display: 'inherit'
  })),
  transition('1 => 2', animate('1000ms ease-out')),
  transition('3 => 4', animate('1ms linear')),
  transition('* => 0', animate('0ms linear')),
  transition('* => *', animate('500ms ease-out')),
  ])]
})
export class BotaoJogoComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  @Input() estado: number = 0;
  private _ativo: Boolean = false;
  private emAnimacao: Boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  private estadoAvancar: number = -1;
  @Input()
  set ativo(ativo: boolean) {
    this._ativo = ativo;
    if (this._ativo) {
      if (!this.emAnimacao) {
        setTimeout(() => this.mudarEstado(1), 500);
      } else if (this.estado === 0) {
        setTimeout(() => this.mudarEstado(1), 500);
      }
    } else {
      if (this.emAnimacao) {
        this.estadoAvancar = 0;
      } else {
        this.mudarEstado(0);
      }
    }
  }
  @Output() jogar: EventEmitter<boolean> = new EventEmitter<boolean>();
  // tslint:disable-next-line:no-inferrable-types
  private estadoInicou: number = 0;
  private alterarEstadoEntra: Boolean = false;
  private alterarEstadoSai: Boolean = false;
  constructor(private jogo: Jogo) {
  }

  ngOnInit() {
  }
  mudarEstado(estado: number) {
    this.estado = estado;
    this.alterarEstadoEntra = false;
    this.alterarEstadoSai = false;
  }
  iniciouAnimacao() {
    this.estadoInicou = this.estado;
  }
  finalizarAnimacaoBotao() {
    if (this.estadoAvancar === 0) {
      this.mudarEstado(this.estadoAvancar);
      this.estadoAvancar = -1;
      this.emAnimacao = false;
      return;
    } else {
      this.emAnimacao = true;
    }
    if (!this._ativo || this.estadoInicou !== this.estado) {
      return;
    }
    if (this.alterarEstadoEntra && this.estado < 3) {
      this.estado = 3;
      this.alterarEstadoEntra = false;
    }
    if (this.alterarEstadoSai && this.estado >= 3) {
      this.estado = 1;
      this.alterarEstadoSai = false;
    }
    switch (this.estado) {
      case 1:
        this.estado++;
        break;
      case 2:
        this.estado--;
        break;
      case 3:
        this.estado++;
        break;
      case 4:
        this.estado--;
        break;
      default:
        break;
    }
  }
  entrouMouse() {
    if (!this._ativo) {
      return;
    }
    this.alterarEstadoEntra = true;
  }
  saiuMouse() {
    if (!this._ativo) {
      return;
    }
    this.alterarEstadoSai = true;
  }
  iniciarJogo() {
    if (!this.jogo.iniciarJogo()) {
      this.jogo.comecarJogo();
      this.jogar.emit(true);
      this.ativo = true;
    }
  }
}
