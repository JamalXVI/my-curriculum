import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonagemCarregarComponent } from './personagem-carregar.component';

describe('PersonagemCarregarComponent', () => {
  let component: PersonagemCarregarComponent;
  let fixture: ComponentFixture<PersonagemCarregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonagemCarregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonagemCarregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
