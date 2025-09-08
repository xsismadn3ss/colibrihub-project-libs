import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectComponent } from './auth.component';

describe('ProtectComponent', () => {
  let component: ProtectComponent;
  let fixture: ComponentFixture<ProtectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
