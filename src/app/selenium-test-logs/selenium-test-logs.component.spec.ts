import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleniumTestLogsComponent } from './selenium-test-logs.component';

describe('SeleniumTestLogsComponent', () => {
  let component: SeleniumTestLogsComponent;
  let fixture: ComponentFixture<SeleniumTestLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleniumTestLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleniumTestLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
