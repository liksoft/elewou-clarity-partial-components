import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikHotspotComponent } from './lik-hotspot.component';

describe('LikHotspotComponent', () => {
  let component: LikHotspotComponent;
  let fixture: ComponentFixture<LikHotspotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikHotspotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikHotspotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
