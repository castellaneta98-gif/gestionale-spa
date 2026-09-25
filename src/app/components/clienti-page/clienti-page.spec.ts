import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientiPage } from './clienti-page';

describe('ClientiPage', () => {
  let component: ClientiPage;
  let fixture: ComponentFixture<ClientiPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientiPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
