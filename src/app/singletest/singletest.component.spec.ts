import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SingletestComponent} from './singletest.component';

describe('SingletestComponent', () => {
    let component: SingletestComponent;
    let fixture: ComponentFixture<SingletestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SingletestComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SingletestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
