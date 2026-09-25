import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioniPage } from './prenotazioni-page';

describe('PrenotazioniPage', () => {
  let component: PrenotazioniPage;
  let fixture: ComponentFixture<PrenotazioniPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrenotazioniPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrenotazioniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
