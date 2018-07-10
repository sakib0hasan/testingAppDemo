import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTypePanelComponent } from './test-type-panel.component';

describe('TestTypePanelComponent', () => {
  let component: TestTypePanelComponent;
  let fixture: ComponentFixture<TestTypePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTypePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
