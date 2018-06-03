import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { LetraTextoComponent } from './letra-texto/letra-texto.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-sentenca',
  templateUrl: './sentenca.component.html',
  styleUrls: ['./sentenca.component.css']
})
export class SentencaComponent implements OnInit, AfterViewInit {
  @Input() frase: String = '';
  @Input() tamanho: String = '14px';
  @ViewChildren('letras') letrasLista: QueryList<LetraTextoComponent>;
  private listaDeLetras: LetraTextoComponent[];
  @Output() x: EventEmitter<number> = new EventEmitter<number>();
  @Output() y: EventEmitter<number> = new EventEmitter<number>();
  @Output() posicao: EventEmitter<[number, number]> = new EventEmitter<[number, number]>();
  private xLetras: number[] = [];
  private yLetras: number[] = [];
  private _iniciar: boolean;
  private _iniciarJogo: boolean;
  private _primeiroIndice = 0;
  private _ultimoIndice = 0;
  private _dano: { direita: number, esquerda: number } = { direita: 0, esquerda: 0 };
  // tslint:disable-next-line:no-inferrable-types
  private _finalizou: boolean = false;
  podeIniciar: boolean[] = [];
  @ViewChildren('letras') letras: QueryList<LetraTextoComponent>;
  constructor(protected cdRef: ChangeDetectorRef) {
    for (let i = 0; i < this.frase.length; i++) {
      this.podeIniciar[i] = false;
    }
  }
  // tslint:disable-next-line:max-line-length
  @Output('matouLetra') matouLetra: EventEmitter<{ avanco: number, posicao: number, jogador: boolean }> = new EventEmitter<{ avanco: number, posicao: number, jogador: boolean }>();
  @Output('finalizou') finalizou: EventEmitter<boolean> = new EventEmitter<boolean>();
  get iniciar(): boolean {
    return this._iniciar;
  }
  @Input()
  set iniciar(iniciar: boolean) {
    this._iniciar = iniciar;
    if (this._iniciar) {
      this.acabar(-1, true);
    }
  }
  @Input() set causarDano(obj: { direita: number, esquerda: number }) {
    if (obj && (obj.direita || obj.esquerda)) {
      if (obj.direita) {
        this._dano.direita = obj.direita;
      }
      if (obj.esquerda) {
        this._dano.esquerda = obj.esquerda;
      }
    }
  }
  @Input()
  set iniciarJogo(iniciar: boolean) {
    this._iniciarJogo = iniciar;
    this.orientarPersonagem();
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.listaDeLetras = this.letrasLista.toArray();
    this._ultimoIndice = this.listaDeLetras.length - 1;
  }
  acabar(i, $event) {
    if ($event) {
      const novoIndice = i + 1;
      for (let j = 0; j < this.podeIniciar.length; j++) {
        this.podeIniciar[j] = novoIndice === j ? true : this.podeIniciar[j];
      }
      this.emitarFinalizou(novoIndice);
    }
  }
  private emitarFinalizou(indice) {
    if (indice >= this.podeIniciar.length) {
      this.finalizou.emit(true);
      this._finalizou = true;
    }
  }
  orientarPersonagem() {
    if (this._finalizou && this._iniciarJogo) {
      this.posicao.emit([this.xLetras[this.xLetras.length - 1], this.yLetras[this.yLetras.length - 1]]);
    }
  }

  chamarX(i, $event) {
    this.xLetras[i] = $event;
  }
  chamarY(i, $event) {
    this.yLetras[i] = $event;
  }
  verificarDano(i): { esquerda: number, direita: number } {
    const retorno: { esquerda: number, direita: number } = { esquerda: 0, direita: 0 };
    if (this._dano.direita && i === this._ultimoIndice) {
      retorno.direita = this._dano.direita;
      console.log('Dano Direita: ' + JSON.stringify(retorno) + ' / Indice: ' + i);
      this._dano.direita = 0;
    }
    if (this._dano.esquerda && i === this._primeiroIndice) {
      console.log('Dano Esquerda: ' + JSON.stringify(retorno) + ' / Indice: ' + i);
      retorno.esquerda = this._dano.esquerda;
    }
    return retorno;
  }
  public verificarPodeIniciar(i): Boolean {
    this.podeIniciar[i] = this.podeIniciar[i] ? this.podeIniciar[i] : false;
    return this.podeIniciar[i];
  }
  public eMorreu(i, $event) {
    let jogador = false;
    if (i === this._ultimoIndice) {
      jogador = true;
      const ultimoIndice = this._ultimoIndice;
      this._ultimoIndice = this.retornarIndice(this._ultimoIndice, -1);
      let avanco = 0;
      // tslint:disable-next-line:no-shadowed-variable
      for (let i = this._ultimoIndice; i < ultimoIndice; i++) {
        avanco += this.xLetras[i] - this.xLetras[i - 1];
      }
      this.matouLetra.emit({avanco: avanco, posicao: i, jogador: jogador });
    }
  }
  retornarIndice(indice: number, acrescimo: number): number {
    indice += acrescimo;
    if (this.frase.length > indice && indice > 0) {
      if (this.frase.substring(indice, indice + 1).includes(' ')) {
        return this.retornarIndice(indice, acrescimo);
      } else {
        return indice;
      }
    } else {
      return -1;
    }
  }
}
