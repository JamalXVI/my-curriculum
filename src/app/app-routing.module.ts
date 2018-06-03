import { SentencaComponent } from './sentenca/sentenca.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Location, LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';

import { JogoComponent } from './jogo/jogo.component';
import { CirculoComponent } from './circulo/circulo.component';
import { LetraTextoComponent } from './sentenca/letra-texto/letra-texto.component';
import { BolhasComponent } from './sentenca/letra-texto/bolhas/bolhas.component';
import { BotaoHamburgerComponent } from './barra-navegacao/botao-hamburger/botao-hamburger.component';
import { BarraNavegacaoComponent } from './barra-navegacao/barra-navegacao.component';
import { LogoImgComponent } from './barra-navegacao/logo-img/logo-img.component';
import { LetraBarraNavegacaoComponent } from './barra-navegacao/letra-barra-navegacao/letra-barra-navegacao.component';
import { CarregarComponent } from './carregar/carregar.component';
import { PersonagemCarregarComponent } from './carregar/personagem-carregar/personagem-carregar.component';
import { BotaoJogoComponent } from './jogo/botao-jogo/botao-jogo.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'jogo' },
    {
        path: 'jogo',
        component: JogoComponent

    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        Location,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
export class AppRoutingModule { }

export const routedComponents = [
    JogoComponent,
    LetraTextoComponent,
    SentencaComponent,
    BolhasComponent,
    CirculoComponent,
    BotaoHamburgerComponent,
    BarraNavegacaoComponent,
    LogoImgComponent,
    LetraBarraNavegacaoComponent,
    CarregarComponent,
    PersonagemCarregarComponent,
    BotaoJogoComponent
];
