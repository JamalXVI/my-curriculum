import {trigger, animate, state, style, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bolhas',
  templateUrl: './bolhas.component.html',
  styleUrls: ['./bolhas.component.css'],
  animations:  [ ]
})
export class BolhasComponent implements OnInit, AfterViewInit {
  @Input() xInicial = 0;
  @Input() yInicial = 0;
  @Input() forca = 20;
  @Input() tempo = 1.5;
  @Input() angulo = 30;
  @Input() sinal = 1;
  @Input() modificador = 0.25;
  xFinal = 0;
  yFinal = 0;
  xMed = 0;
  yMed = 0;
  constante = 0.01 * window.screen.width;
  constructor(public sanitizer: DomSanitizer) {
   }

  ngOnInit() {
    this.yMed = -1 *  this.modificador * (this.forca * this.constante);
    this.xMed = this.modificador * (this.xInicial + this.sinal * this.forca * this.constante);
    this.yFinal = this.yInicial + this.forca * this.constante;
    this.xFinal = this.xInicial + this.sinal * this.forca * this.constante;
  }
  ngAfterViewInit(): void {
  }

}
