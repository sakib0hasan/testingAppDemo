import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetNameComponent } from './preset-name.component';

describe('PresetNameComponent', () => {
  let component: PresetNameComponent;
  let fixture: ComponentFixture<PresetNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresetNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
