import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentencaComponent } from './sentenca.component';

describe('SentencaComponent', () => {
  let component: SentencaComponent;
  let fixture: ComponentFixture<SentencaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentencaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
