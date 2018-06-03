import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoHamburgerComponent } from './botao-hamburger.component';

describe('BotaoHamburgerComponent', () => {
  let component: BotaoHamburgerComponent;
  let fixture: ComponentFixture<BotaoHamburgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoHamburgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoHamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
