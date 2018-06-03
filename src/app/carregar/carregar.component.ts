import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-carregar',
  templateUrl: './carregar.component.html',
  styleUrls: ['./carregar.component.css'],
  animations: [trigger('mover', [state('0', style({
    right: '-100vw'
  })),
  state('1', style({
    right: '0vw'
  })),
  state('2', style({
    right: '116vw'
  })),
  transition('0 => 1', animate('1000ms ease-out')),
  transition('1 => 2', animate('1000ms ease-out')),
  transition('* => *', animate('0ms ease-out')),
  ])
  ]
})
export class CarregarComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  @Input() movendo: number = 0;
  constructor() { }

  ngOnInit() {
  }
  public finalizouMover() {
    if (this.movendo === 2) {
      this.movendo = 0;
    }
  }
}
