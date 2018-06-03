import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolhasComponent } from './bolhas.component';

describe('BolhasComponent', () => {
  let component: BolhasComponent;
  let fixture: ComponentFixture<BolhasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolhasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
