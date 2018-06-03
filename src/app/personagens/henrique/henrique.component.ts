import { Component, OnInit, ChangeDetectorRef, HostListener, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Jogo, JogoJogador } from '../../nucleo';

@Component({
  selector: 'app-henrique',
  templateUrl: './henrique.component.html',
  styleUrls: ['./henrique.component.css']
})
export class HenriqueComponent implements OnInit {
  private movs: String[] = ['../../assets/images/animacoes/henrique/idle/1.png',
    '../../assets/images/animacoes/henrique/idle/2.png',
    '../../assets/images/animacoes/henrique/idle/3.png',
    '../../assets/images/animacoes/henrique/acao/1.png',
    '../../assets/images/animacoes/henrique/acao/2.png',
    '../../assets/images/animacoes/henrique/acao/3.png'];
  private proporcoes: number[] = [10, 1, 6, 5, 2, 3];
  // tslint:disable-next-line:no-inferrable-types
  private inverso: number = 1;
  // tslint:disable-next-line:no-inferrable-types
  private posicao: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  private indice: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  private contadorAnimacao: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  private y: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  private x: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  private xProp: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  private yProp: number = 0;
  private indicadorX = 0;
  private indicadorY = 0;
  @Output() emitirAtaque: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public sanitizer: DomSanitizer, private _cdRef: ChangeDetectorRef, private jogo: Jogo) {
    setInterval(() => this.rotinaDoJogo(), Jogo.TEMPOLOOP);
  }
  movimentoSuave() {
    const p = Jogo.PASSO_AVANCO;
    this.xProp = this.jogo.jogador.x - this.x;
    this.yProp = this.jogo.jogador.y - this.y;
    console.log(this.xProp);
    this.indicadorX = this.xProp === 0 ? 0 : this.xProp > 0 ? (this.x + p > this.jogo.jogador.x ? this.xProp : p) :
      (this.x - p < this.jogo.jogador.x ? this.xProp : -p);
    this.indicadorY = this.yProp === 0 ? 0 : this.yProp > 0 ? (this.y + p > this.jogo.jogador.y ? this.yProp : p) :
      (this.y - p < this.jogo.jogador.y ? this.yProp : -p);
      console.log(this.indicadorX);
    if (this.indicadorX !== 0 || this.indicadorY !== 0) {
      this.x += this.indicadorX;
      this.y += this.indicadorY;
    }
  }
  inicioMovimentos() {
    console.log('Posicionar!');
    this.x = this.jogo.jogador.x;
    this.y = this.jogo.jogador.y;
    this.jogo.jogador.posicionado = true;
  }
  animacaoDeFrames() {
    if (Jogo.TEMPOLOOP * this.contadorAnimacao >= Jogo.TEMPOANIMACAO * this.proporcoes[this.posicao]) {
      this.contadorAnimacao = 0;
      this.posicao = (this.posicao % 3) + this.inverso + (this.indice * 3);
      this.inverso = this.posicao >= 2 + (this.indice * 3) ? -1 : this.posicao <= 0 + (this.indice * 3) ? 1 : this.inverso;
      this.logicaAtacando();
    } else {
      this.contadorAnimacao++;
    }
  }
  private logicaAtacando(): void {
    if (this.jogo.jogador.atacar) {
      this.mudarPosicao(1);
    } else if (this.posicao <= 0 + (this.indice * 3) && !this.jogo.jogador.atacar && this.jogo.jogador.atacando) {
      this.mudarPosicao(0);
    }
  }
  mudarPosicao(posicao: number) {
    this.indice = posicao === 1 ? 1 : 0;
    this.jogo.jogador.atacar = false;
    this.jogo.jogador.atacando = posicao === 0 ? false : true;
    this.posicao = 0;
    this.inverso = 1;
    this.contadorAnimacao = Jogo.TEMPOANIMACAO * this.proporcoes[this.posicao];
    if (posicao === 0) {
      this.emitirAtaque.emit(true);
    }
  }
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      if (this.jogo.verificarSePodePosicionarJogador() && this.jogo.jogador.posicionado && !this.jogo.jogador.verificarAtacando()) {
        this.jogo.jogador.atacar = true;

      }
    }
  }
  rotinaDoJogo() {
    if (!this.jogo.emJogo) {
      return;
    }
    if (this.jogo.verificarSePodePosicionarJogador() && this.jogo.jogador.posicionado) {
      this.movimentoSuave();
    } else if (this.jogo.verificarSePodePosicionarJogador()) {
      this.inicioMovimentos();
    }
    this.animacaoDeFrames();
  }
  ngOnInit() {
  }

}
