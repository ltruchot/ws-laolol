import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaololComponentsComponent } from './laolol-components.component';

describe('LaololComponentsComponent', () => {
  let component: LaololComponentsComponent;
  let fixture: ComponentFixture<LaololComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaololComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaololComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
