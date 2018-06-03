import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-personagem-carregar',
  templateUrl: './personagem-carregar.component.html',
  styleUrls: ['./personagem-carregar.component.css'],
  animations: [trigger('mover', [state('0', style({
    right: '-116vw'
  })),
  state('1', style({
    right: '-16vw'
  })),
  state('2', style({
    right: '100vw'
  })),
  transition('0 => 1', animate('1000ms ease-out')),
  transition('1 => 2', animate('1000ms ease-out')),
  transition('* => *', animate('0ms ease-out')),
  ])
  ]
})
export class PersonagemCarregarComponent implements OnInit {
  private movs: String[] = ['../../assets/images/animacoes/henrique/acao/1.png',
    '../../assets/images/animacoes/henrique/acao/2.png',
    '../../assets/images/animacoes/henrique/acao/3.png'];
  // tslint:disable-next-line:no-inferrable-types
  private posicao: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  @Input() movendo: number = 0;
  constructor() { }

  ngOnInit() {
    setInterval(() => this.mudarPosicao(), 150);
  }

  mudarPosicao() {
    if (this.movendo === 2) {
      this.posicao = (this.posicao + 1) % 3;

    }
  }
}
