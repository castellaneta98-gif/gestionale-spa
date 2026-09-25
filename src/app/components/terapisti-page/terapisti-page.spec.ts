import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerapistiPage } from './terapisti-page';

describe('TerapistiPage', () => {
  let component: TerapistiPage;
  let fixture: ComponentFixture<TerapistiPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerapistiPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerapistiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
