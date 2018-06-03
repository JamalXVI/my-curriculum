import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, ChangeDetectorRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routedComponents, AppRoutingModule } from './app-routing.module';
import { BolhasComponent } from './sentenca/letra-texto/bolhas/bolhas.component';
import { HenriqueComponent } from './personagens/henrique/henrique.component';
import { InimigoComponent } from './personagens/inimigo/inimigo.component';


@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    HenriqueComponent,
    InimigoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  entryComponents: [BolhasComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
