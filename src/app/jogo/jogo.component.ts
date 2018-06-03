import { Component, OnInit, HostListener } from '@angular/core';
import { Jogo } from '../nucleo/';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  iniciarSetenca: Boolean = false;
  demaisFrases: boolean[] = [false, false];
  iniciarJogoEmFrase: boolean[] = [false, false];
  private _danos: { direita: number, esquerda: number }[] = [{ direita: 0, esquerda: 0 }, { direita: 0, esquerda: 0 }];
  fontesMaiores: string[] = ['36px', '24px'];
  fontesMenores: string[] = ['24px', '18px'];
  // tslint:disable-next-line:no-inferrable-types
  ativoBotao: boolean = false;
  fontes: string[] = [];
  textoNome: String = 'Henrique Arantes';
  textoSlogam: String = 'Full Stack Developer';
  // tslint:disable-next-line:no-inferrable-types
  espNome: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  espTitulo: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  contadorEspaco: number = 0;
  constructor(private jogo: Jogo) {
    this.verficarTamanhoFonte();
    setInterval(() => this.rotinaDoJogo(), Jogo.TEMPOLOOP);
  }
  ngOnInit() {
    this.jogo.reiniciarDados();
  }
  finalizouAnimacaoCirculo($event) {
    if ($event) {
      this.iniciarSetenca = true;
    }
  }
  finalizarFrase(i, $event) {
    setTimeout(() => {
      this.demaisFrases[i] = true;
    }, 300);
  }
  @HostListener('window:resize', ['$event'])
  mudarTamanho($event) {
    this.verficarTamanhoFonte();
  }
  verficarTamanhoFonte() {
    if (window.innerWidth <= 700) {
      this.fontes = this.fontesMenores;
    } else {
      this.fontes = this.fontesMaiores;
    }
  }
  verIniciarJogo() {
    if (!this.jogo.iniciarJogo() && this.podeIniciar()) {
      this.ativoBotao = true;
    }
  }
  private rotinaDoJogo() {

  }
  emitirAtaque($event) {
    if ($event) {
      console.log('Atacou!');
      this._danos[0].direita = 25;
    }
  }
  verificarDano(i: number): { direita: number, esquerda: number } {
    const retorno: { direita: number, esquerda: number } = { direita: 0, esquerda: 0 };
    if (this._danos[i] && (this._danos[i].direita || this._danos[i].esquerda)) {
      if (this._danos[i].esquerda) {
        retorno.esquerda = this._danos[i].esquerda;
        this._danos[i].esquerda = 0;
      }
      if (this._danos[i].direita) {
        retorno.direita = this._danos[i].direita;
        this._danos[i].direita = 0;
      }
    }
    return retorno;
  }
  verDesaparecer() {
    this.ativoBotao = false;
  }
  podeIniciar(): boolean {
    // tslint:disable-next-line:no-inferrable-types
    let retorno: boolean = true;
    this.demaisFrases.forEach(bool => {
      retorno = !bool ? bool : retorno;
    });
    return retorno;
  }
  comecarJogo($event) {
    if (this.jogo.iniciarJogo()) {
      this.iniciarJogoEmFrase[0] = true;
    }
  }
  mudarPosicao($event: number[]) {
    this.jogo.iniciarPosicionamentoJogador($event[0], $event[1]);
  }
  matouLetra($event) {
    if ($event.jogador) {
      this.jogo.iniciarPosicionamentoJogador(this.jogo.jogador.x - $event.avanco * 2, this.jogo.jogador.y);
    }
  }
}
