import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaololStorybookComponent } from './laolol-storybook.component';

describe('LaololStorybookComponent', () => {
  let component: LaololStorybookComponent;
  let fixture: ComponentFixture<LaololStorybookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaololStorybookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaololStorybookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
