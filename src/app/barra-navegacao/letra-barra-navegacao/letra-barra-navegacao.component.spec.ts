import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetraBarraNavegacaoComponent } from './letra-barra-navegacao.component';

describe('LetraBarraNavegacaoComponent', () => {
  let component: LetraBarraNavegacaoComponent;
  let fixture: ComponentFixture<LetraBarraNavegacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetraBarraNavegacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetraBarraNavegacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
