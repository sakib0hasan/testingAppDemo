import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-scheduler-test-reports',
  templateUrl: './scheduler-test-reports.component.html',
  styleUrls: ['./scheduler-test-reports.component.scss']
})
export class SchedulerTestReportsComponent implements OnInit {

    paramsId: string = '';
    testId: string = '';

    testName: string = 'AlexaConfig_API';
    presetName: string = 'Dummy_Prest_ALEXA_account';

    runningTest : string = 'V1.2_3789';

    reports = [
        {
            id: uuid(),
            server: 'connecting to QAServer1',
            result: 'Accessed Successfully',
            status: 'Pass with Status 200',
            performance: '100ms',
        },
        {
            id: uuid(),
            server: 'Accessing Alex',
            result: 'Accessed Successfully',
            status: 'Pass with Status 200',
            performance: '300ms',
        },
        {
            id: uuid(),
            server: 'connecting to CCS',
            result: 'Accessed Successfully',
            status: 'Pass with Status 200',
            performance: '100ms',
        },
        {
            id: uuid(),
            server: 'connecting to AUS',
            result: 'PIN Matched.',
            status: 'Pass with Status 200',
            performance: '50ms',
        }
    ];

    constructor(private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.paramsId = params.id;
                this.testId = params.testId;
            } else {

            }
        });
    }

    backToTestReports() {
        this.router.navigate(['/scheduler/' + this.paramsId + '/tests']);
    }

    ngOnInit() {
    }

}
