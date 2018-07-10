import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {v4 as uuid} from 'uuid';
import {BackendService} from '../service/backend.service';

@Component({
    selector: 'app-scheduler-tests',
    templateUrl: './scheduler-tests.component.html',
    styleUrls: ['./scheduler-tests.component.scss']
})
export class SchedulerTestsComponent implements OnInit {

    paramsId: string = '';

    testName: string = 'AlexaConfig_API';
    presetName: string = 'Dummy_Prest_ALEXA_account';

    tests = [
        {
            id: uuid(),
            testId: 'V1.2_3789',
            date: '4/18/2018',
            time: '12:00',
            result: 'pass',
            performance: '850ms',
        },
        {
            id: uuid(),
            testId: 'V1.2_3790',
            date: '4/18/2018',
            time: '12:30',
            result: 'pass',
            performance: '850ms',
        },
        {
            id: uuid(),
            testId: 'V1.2_3791',
            date: '4/18/2018',
            time: '12:30',
            result: 'pass',
            performance: '850ms',
        }

    ];

    clickedOnReport(test){
        this.router.navigate(['/scheduler/' + this.paramsId + '/tests/' + test.id]);
    }

    constructor(private backendService: BackendService, private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.paramsId = params.id;
            } else {

            }
        });
    }

    backToTestReports() {
        this.router.navigate(['/scheduler/' + this.paramsId]);
    }

    ngOnInit() {
    }

}
