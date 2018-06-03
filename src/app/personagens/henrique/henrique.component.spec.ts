import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HenriqueComponent } from './henrique.component';

describe('HenriqueComponent', () => {
  let component: HenriqueComponent;
  let fixture: ComponentFixture<HenriqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HenriqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HenriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
