import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, AfterContentInit,
   DoCheck, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-letra-barra-navegacao',
  templateUrl: './letra-barra-navegacao.component.html',
  styleUrls: ['./letra-barra-navegacao.component.css'],
  animations: [trigger('corBarra', [state('false', style({
    'background-position-x': '0px'
  })),
  state('true', style({
    'background-position-x': '200px',
  })),
  transition('false => true', animate('1s ease-out')),
  transition('true => false', animate('0s')),
  ]),
  trigger('corFundo', [state('false', style({
    'background-color': 'rgba(0,0,0,0.0)'
  })),
  state('true', style({
    'background-color': 'rgba(0,0,0,0.6)'
  })),
  transition('* => *', animate('250ms ease-out'))
  ]),
  trigger('mostrarTitulo', [state('false', style({
    'margin-left': '-100%',
    'opacity': '0'
  })),
  state('true', style({
    'margin-left': '0%',
    'opacity': '1'
  })),
  transition('* => *', animate('50ms ease-out'))
  ])
  ]
})
export class LetraBarraNavegacaoComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, DoCheck {
  @Input() public texto: string;
  @ViewChild('textoLetra') textoLetra: ElementRef;
  private largura = 0;
  private margemEsquerda = 0;
  public corBarra: Boolean = false;
  public corFundo: Boolean = false;
  private larguraAntiga: Number = 0;
  @Input() mostrarTitulo: Boolean = true;
  @Input() selecionado: Boolean = false;
  constructor() {
  }

  ngOnInit() {
    this.texto = this.texto.toUpperCase();
  }
  ngAfterContentInit(): void {
  }
  ngAfterViewInit(): void {
  }
  ngAfterViewChecked(): void {
  }
  ngDoCheck(): void {
    this.verficarTamanhoBarra();
  }
  @HostListener('window:resize', ['$event'])
  mudarTamanho($event) {
    this.verficarTamanhoBarra();
  }
  verficarTamanhoBarra() {
    const rect = this.textoLetra.nativeElement.getBoundingClientRect();
    if (rect.left > 0 && rect.width > 0 && this.larguraAntiga !== window.innerWidth) {
      this.larguraAntiga = window.innerWidth;
      this.margemEsquerda = rect.left;
      this.largura = rect.width;
    }
  }
  mousePassou($event) {
    this.corFundo = true;
  }
  saidaMouse() {
    if (!this.selecionado) {
      this.corFundo = false;
    }
  }
  ativarTraco() {
    if (!this.corBarra && this.corFundo) {
      this.corBarra = true;
    }
  }
  finalizouCorBarra($event) {
    if (this.corBarra) {
      this.corBarra = false;
    }
  }
}
