import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceTestingReportComponent } from './performance-testing-report.component';

describe('PerformanceTestingReportComponent', () => {
  let component: PerformanceTestingReportComponent;
  let fixture: ComponentFixture<PerformanceTestingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceTestingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceTestingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
