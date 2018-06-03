import {
  Component, OnInit, ViewChild, Output, ElementRef, AfterViewInit, Input,
  EventEmitter, ChangeDetectorRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef, AfterViewChecked
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { BolhasComponent } from './bolhas/bolhas.component';
import * as _ from 'lodash';
@Component({
  selector: 'app-letra-texto',
  templateUrl: './letra-texto.component.html',
  styleUrls: ['./letra-texto.component.css'],
  animations: [trigger('iniciou',
    [state('false', style({
      opacity: '0'
    })),
    state('true', style({
      opacity: '1'
    })),
    transition('* => *', animate('30ms ease-in'))
    ]),
  ]
})
export class LetraTextoComponent implements OnInit, AfterViewInit, AfterViewChecked {
  direita = 100;
  esquerda = 0;
  @Output() acabou: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() x: EventEmitter<number> = new EventEmitter<number>();
  @Output() y: EventEmitter<number> = new EventEmitter<number>();
  @Output() w: EventEmitter<number> = new EventEmitter<number>();
  @Output() h: EventEmitter<number> = new EventEmitter<number>();
  @Output() morta: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() letra;
  @Input() tamanho;
  @Input() cor = 'rgba(255,255,255,1)';
  @ViewChild('letraInteira') letraInteira: ElementRef;
  @ViewChild('somenteLetra') somenteLetra: ElementRef;
  @ViewChild('saidaBolha', { read: ViewContainerRef }) saidaBolha: ViewContainerRef;
  @Input() indice: Number = 0;
  @Input() iniciou: Boolean = false;
  @Input() set dano(obj: { esquerda: number, direita: number }) {
    if (obj && (obj.direita || obj.esquerda) && this._parteComida < 100) {
      const total = this._parteComida + obj.esquerda + obj.direita;
      if ( total < 100) {
        if (obj.esquerda) {
          this.esquerda += obj.esquerda;
          this.criarBolhas(-1, 5, 10);
        }
        if (obj.direita) {
          this.direita -= obj.direita;
          this.criarBolhas(1, 5, 10);
        }
        this.mudarCor();
      } else {
        this.esquerda = 100;
        this.direita = 100;
        this._parteComida = 100;
        this.morta.emit(true);
      }
    }
  }
  private _x = 0;
  private _y = 0;
  private _height = 0;
  private _widthLetra = 0;
  private _width = 0;
  private _parteComida = 20;
  public bolhas: ComponentRef<BolhasComponent>[] = [];
  ngAfterViewInit(): void {
    const rect = this.letraInteira.nativeElement.getBoundingClientRect();
    const rectLetra = this.letraInteira.nativeElement.getBoundingClientRect();
    this.colocarValores(rect);
    this._widthLetra = rectLetra.width;
    this.mudarCor();
  }
  ngAfterViewChecked(): void {
  }
  constructor(public sanitizer: DomSanitizer, private _cdRef: ChangeDetectorRef, private resolver: ComponentFactoryResolver) {
    this.iniciou = false;
  }
  private mudarCor() {
    this._parteComida = (100 - this.direita) + this.esquerda;
    const vermelho = 255 * this._parteComida / 100;
    const porcentagem = (255 - (+vermelho.toFixed(0)));
    this.cor = 'rgba(255,' + porcentagem + ',' + porcentagem + ',1)';
    this._cdRef.detectChanges();
  }
  private colocarValores(rect: any) {
    this._x = rect.left;
    this._y = rect.top;
    this._width = rect.width;
    this._height = rect.height;
    this.emitirValores();
  }
  private emitirValores() {
    this.x.emit(this._x - this._width);
    this.y.emit(this._y);
    this.w.emit(this._width);
    this.h.emit(this._height);
  }
  ngOnInit() {
  }
  espacarLetra() {
    const espaco = this.esquerda * this._widthLetra / 100;
    return espaco;
  }
  verificarAtaqueProjetil() {
  }
  rgb2hex() {
    const rgb = this.cor.match(/^r?g?b?a?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? '#' +
      ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }
  iniciarComBolhas() {
    if (this.iniciou) {
      if (this.letra.indexOf(' ') !== 0) {
        this.criarBolhas();
      } else {
        this.acabou.emit(true);
      }
    }
  }
  criarBolhas(direcao: number = 0, minimo: number = 1, maximo: number = 5) {
    this.saidaBolha.clear();
    const factory = this.resolver.resolveComponentFactory(BolhasComponent);
    const numBolha = this.retornarRandomicoInteiro(minimo, maximo);
    let tempoMaximo = 0;
    const fator: number = window.innerWidth <= 700 ? 2.5 : 1;
    for (let i = 0; i < numBolha; i++) {
      const tempo = 1.5 + Math.random();
      tempoMaximo = Math.max(tempoMaximo, tempo);
      const bolha: ComponentRef<BolhasComponent> = this.saidaBolha.createComponent(factory);
      const sinal = direcao ? direcao : this.retornarRandomicoInteiro(0, 1) ? 1 : -1;
      const negativoY = this.retornarRandomicoInteiro(0, 1) ? 1 : -1;
      const x = sinal * this.retornarRandomicoInteiro(5, 10);
      const y = negativoY * this.retornarRandomicoInteiro(5, 15);
      const angulo = sinal ? 30 : 120;
      const modificador = this.retornarRandomicoInteiro(15, 45) / 100.00;
      bolha.instance.xInicial = x;
      bolha.instance.yInicial = y;
      bolha.instance.forca = fator * this.retornarRandomicoInteiro(10, 20);
      bolha.instance.tempo = tempo;
      bolha.instance.sinal = sinal;
      bolha.instance.angulo = sinal;
      bolha.instance.modificador = modificador;
      setTimeout(() =>
        bolha.destroy(), tempo * 600);
    }
    setTimeout(() => {
      this.acabou.emit(true);
    }, tempoMaximo * 2);
  }
  retornarRandomicoInteiro(minimo: number, maximo: number) {
    return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
  }
}
