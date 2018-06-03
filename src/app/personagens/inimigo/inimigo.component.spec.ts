import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InimigoComponent } from './inimigo.component';

describe('InimigoComponent', () => {
  let component: InimigoComponent;
  let fixture: ComponentFixture<InimigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InimigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InimigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
