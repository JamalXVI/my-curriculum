import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-logo-img',
  templateUrl: './logo-img.component.html',
  styleUrls: ['./logo-img.component.css'],
  animations: [trigger('logoMoeda', [
    state('inicial', style({
      transform: 'rotateY(0deg)',
    })),
    state('rodar', style({
      transform: 'rotateY(90deg)'
    })),
    transition('* => *', animate('200ms ease-in'))
  ])]
})
export class LogoImgComponent implements OnInit {
  static LOGO1 = '/../assets/images/logo-placeholder-1.png';
  static LOGO2 = '/../assets/images/logo-placeholder-2.png';
  private logo;
  private estado: String = 'inicial';
  private mouseFora: Boolean = false;
  private emAnimacao: Boolean = false;
  private tocar: Boolean = true;
  constructor() {
    this.logo = LogoImgComponent.LOGO1;
  }
  mudarEstado(e?) {
    if (!this.emAnimacao) {
      return;
    }
    if (this.estado === 'rodar') {
      this.logo = this.logo === LogoImgComponent.LOGO1 ? LogoImgComponent.LOGO2 : LogoImgComponent.LOGO1;
    }
    if (!this.mouseFora || this.estado === 'rodar' || this.tocar) {
      this.tocar = false;
      this.estado = this.estado === 'inicial' ? 'rodar' : 'inicial';
    } else {
      this.emAnimacao = false;
    }
  }
  entrarMouse() {
    console.log('entrou');
    this.mouseFora = false;
    if (!this.emAnimacao) {
      this.emAnimacao = true;
      this.mudarEstado();
    }
  }
  toque() {
    this.tocar = true;
    if (!this.emAnimacao) {
      this.emAnimacao = true;
      this.mudarEstado();
    }
  }
  sairMouse() {
    this.mouseFora = true;
  }
  ngOnInit() {
  }

}
