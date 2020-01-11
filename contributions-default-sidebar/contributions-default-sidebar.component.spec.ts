import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionsDefaultSidebarComponent } from './contributions-default-sidebar.component';

describe('ContributionsDefaultSidebarComponent', () => {
  let component: ContributionsDefaultSidebarComponent;
  let fixture: ComponentFixture<ContributionsDefaultSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionsDefaultSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionsDefaultSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
