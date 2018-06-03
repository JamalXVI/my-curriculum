import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoJogoComponent } from './botao-jogo.component';

describe('BotaoJogoComponent', () => {
  let component: BotaoJogoComponent;
  let fixture: ComponentFixture<BotaoJogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoJogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
