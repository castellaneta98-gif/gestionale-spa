import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrattamentiPage } from './trattamenti-page';

describe('TrattamentiPage', () => {
  let component: TrattamentiPage;
  let fixture: ComponentFixture<TrattamentiPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrattamentiPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrattamentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
