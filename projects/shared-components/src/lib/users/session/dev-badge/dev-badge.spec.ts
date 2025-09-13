import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevBadge } from './dev-badge';

describe('DevBadge', () => {
  let component: DevBadge;
  let fixture: ComponentFixture<DevBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
