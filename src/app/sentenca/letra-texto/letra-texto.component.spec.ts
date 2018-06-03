import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetraTextoComponent } from './letra-texto.component';

describe('LetraTextoComponent', () => {
  let component: LetraTextoComponent;
  let fixture: ComponentFixture<LetraTextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetraTextoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetraTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
