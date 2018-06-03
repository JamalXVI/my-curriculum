import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-barra-navegacao',
  templateUrl: './barra-navegacao.component.html',
  styleUrls: ['./barra-navegacao.component.css'],
  animations: [trigger('mostrarBarra', [
    state('true', style({
    })),
    state('false', style([{
    }])),
    transition('false => true', animate('300ms ease-in')),
    transition('true => false', animate('300ms ease-out')),
  ])]
})
export class BarraNavegacaoComponent implements OnInit {
  @Input() mostrarBarra: Boolean = true;
  @Input() antesAbrir: Boolean = true;
  constructor() { }

  ngOnInit() {
  }
  finalizouMostrarBarra($event) {
  }
}
