import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {v4 as uuid} from 'uuid';

@Component({
    selector: 'app-scheduler-details',
    templateUrl: './scheduler-details.component.html',
    styleUrls: ['./scheduler-details.component.scss']
})
export class SchedulerDetailsComponent implements OnInit {

    testName: string = 'AlexaConfig_API';
    presetName: string = 'Dummy_Prest_ALEXA_account';

    paramsId: string = '';


    presets: any[] = [
        {
            id: uuid(),
            checkModel: false,
            name: 'Dilip_Alex_Test_Preset',
            projectType: 'Iot Automation - Alexa',
            testSuite: 'Single Test',
            testType: 'Turn on/off'
        },
        {
            id: uuid(),
            checkModel: false,
            name: 'Erik_API_Turn_on',
            projectType: 'Iot Automation - API',
            testSuite: 'Single Test',
            testType: 'Turn on/off'
        },
        {
            id: uuid(),
            checkModel: false,
            name: 'Thomas_Alexa_AccGroup',
            projectType: 'Iot Automation - Alexa',
            testSuite: 'Grouped Keyword Test',
            testType: 'Account (4)'
        }
    ];

    schedulerTestType: string = 'Simple Test Schedule';
    schedules = [
        {
            name: 'Simple Test Schedule',
            sub: 'Run selected tests once every time and generate reports'
        },
        {
            name: 'Load Test Schedule',
            sub: 'Run load test on selected presets every time and generate reports. Incompatible with load test presets.'
        }
    ];


    schedulerTestCustomTime = '';
    schedulerTestTime: string = 'Scheduled Times per day';
    schedulesTime = [
        { name: 'Scheduled Times per day' },
        { name: 'After every x Minutes' }
    ];


    schedulerTestName: string = 'abc_test';
    emailTo: string = '';

    selectedTimes = ["01:40", "3:20" , "12:20"];

    backToScheduler(){
        this.router.navigate(['/scheduler']);
    }

    constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.paramsId = params.id;
            } else {

            }
        });
    }

    viewTests(){
        this.router.navigate(['/scheduler/' + this.paramsId + '/tests']);
    }

    ngOnInit() {
    }

}
