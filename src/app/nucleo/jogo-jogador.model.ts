import { ArmazenamentoLocal } from './armazenamento-local';

export class JogoJogador {
    private _x: number;
    private _y: number;
    vidas: number;
    pontuacao: number;
    private _posicionado: boolean;
    id: number;
    idJogo: number;
    _atacando: boolean;
    _atacar: boolean;
    posicionar: boolean;
    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this._x = obj && obj._x || 0;
        this._y = obj && obj._y || 0;
        this.vidas = obj && obj.vidas || 0;
        this.pontuacao = obj && obj.pontuacao || 0;
        this._posicionado = obj && obj._posicionado || false;
        this.idJogo = obj && obj.idJogo || 0;
        this._atacando = obj && obj._atacando || false;
        this.posicionar = obj && obj.posicionar || false;
    }
    reiniciarJogador() {
        this._x = 0;
        this._y = 0;
        this.vidas = 0;
        this.pontuacao = 0;
        this._posicionado = false;
        this.idJogo = 0;
        this._atacando = false;
        this.posicionar = false;
    }
    mudarPosicaoJogador(x: number, y: number) {
        if (x) {
            this._x = x || 0;
        }
        if (y) {
            this._y = y || 0;
        }
        this.posicionar = true;
    }
    get atacando(): boolean {
        return this._atacando;
    }
    set atacando(atacando: boolean) {
        this._atacando = atacando || false;
        this._atacar = !this._atacando ? this._atacando : this._atacar;
    }
    get atacar(): boolean {
        return this._atacar;
    }
    set atacar(atacar: boolean) {
        this._atacar = atacar;
    }
    verificarAtacando(): boolean {
        return this._atacando && this.atacar;
    }
    get posicionado(): boolean {
        return this._posicionado;
    }
    set posicionado(posicionado: boolean) {
        this._posicionado = posicionado || false;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
}
