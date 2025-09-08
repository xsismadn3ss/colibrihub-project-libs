import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Protect } from './protect.component';

describe('Protect', () => {
  let component: Protect;
  let fixture: ComponentFixture<Protect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Protect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Protect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
