import { JogoJogador, ArmazenamentoLocal } from '.';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class Jogo {
    static TEMPOLOOP = 10;
    static TEMPOANIMACAO = 20;
    static PASSO_AVANCO = 2;
    emJogo: boolean;
    jogador: JogoJogador;
    inimigo: JogoJogador;
    constructor() {
        this.emJogo = false;
        this.jogador = new JogoJogador(0);
        this.inimigo = new JogoJogador(1);
    }
    comecarJogo() {
        this.emJogo = true;
    }
    iniciarJogo(): boolean {
        return this.emJogo;
    }
    iniciarPosicionamentoJogador(x: number, y: number) {
        if (x && y) {
            this.jogador.mudarPosicaoJogador(x, y);
        }
    }
    verificarSePodePosicionarJogador(): boolean {
        return this.jogador.posicionar && this.emJogo;
    }
    reiniciarDados() {
        this.emJogo = false;
        this.jogador.reiniciarJogador();
        this.inimigo.reiniciarJogador();
    }
}
