import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatStepper} from '@angular/material';
import {BackendService} from '../service/backend.service';
import {Message} from 'primeng/primeng';
import {v4 as uuid} from 'uuid';
import * as _ from 'lodash';
import {Router} from '@angular/router';
import {PINType, TestTypeResponseModel} from '../models/test-type-response.model';
import {DeletePresetDialogComponent} from '../dialogs/delete-preset-dialog/delete-preset-dialog.component';
import {PresetNameComponent} from '../dialogs/preset-name/preset-name.component';

@Component({
    selector: 'app-test-creator',
    templateUrl: './test-creator.component.html',
    styleUrls: ['./test-creator.component.css']
})
export class TestCreatorComponent implements OnInit {
    isLinear = false;
    public projectTypeForm: FormGroup;
    public testSuiteForm: FormGroup;
    public environmentForm: FormGroup;
    projectTypes = [
        {
            name: 'Functional Testing',
            fieldName: 'FunctionalTesting',
            tests: [
                {
                    name: 'API Automation'
                }
            ]
        },
        {
            name: 'Voice Automation',
            fieldName: 'VoiceAutomation',
            tests: [
                {
                    name: 'API Only'
                },
                {
                    name: 'IoT Device'
                }
            ]
        },
        {
            name: 'Performance Testing',
            fieldName: 'PerformanceTesting',
            tests: [
                {
                    name: 'API Only'
                },
                {
                    name: 'IoT Device'
                }
            ]
        },
        {
            name: 'Load Testing',
            fieldName: 'LoadTesting',
            tests: [
                {
                    name: 'System Load'
                }
            ]
        },
        {
            name: 'Browser Testing',
            fieldName: 'BrowserTesting',
            tests: [
                {
                    name: 'Chrome'
                },
                {
                    name: 'Firefox'
                },
                {
                    name: 'Internet Explorer'
                },
                {
                    name: 'All'
                }
            ]
        },
        {
            name: 'Mobile Testing',
            fieldName: 'MobileTesting',
            tests: [
                {
                    name: 'iOS'
                },
                {
                    name: 'Android'
                },
                {
                    name: 'Blackberry'
                }
            ]
        }
    ];
    scriptsSelectedLabel = '';
    testSuiteTypes = [
        {
            name: 'Functions Tests',
            fieldName: 'FunctionsTest',
            tests: [
                {
                    name: 'Single Test'
                },
                {
                    name: 'Smoke Test and Sanity Check'
                },
                {
                    name: 'Ad-Hoc Test'
                },
                {
                    name: 'Keyword Group Test'
                }
            ]
        },
        {
            name: 'Regression Tests',
            fieldName: 'RegressionTest',
            tests: [
                {
                    name: 'Functional & Performance Test'
                }
            ]
        },
        {
            name: 'Service Tests',
            fieldName: 'ServiceTest',
            tests: [
                {
                    name: 'Positive Test'
                },
                {
                    name: 'Negative Test'
                }
            ]
        }
    ];

    environmentTypes = [
        {
            name: 'Development',
            servers: [
                {
                    name: 'DevServer1'
                },
                {
                    name: 'DevServer'
                }
            ]
        },
        {
            name: 'QA',
            servers: [
                {
                    name: 'QAServer1'
                },
                {
                    name: 'QAServer2'
                }
            ]
        },
        {
            name: 'Staging',
            servers: [
                {
                    name: 'StagingServer1'
                },
                {
                    name: 'StagingServer2'
                }
            ]
        },
        {
            name: 'Production',
            servers: [
                {
                    name: 'ProductionServer'
                }
            ]
        },
    ];

    testTypes = [];

    selected = {
        projectTypeLabel: '',
        projectType: '',
        testSuite: '',
        testType: '',
        environment: '',
        selectedTestSuite: '',
        showResultsFor: [],
        scriptsSelected: '',
        pin: new PINType("", ""),
        testScenario: '',
        testDetailsPayload: null,
        typeName: ''
    };

    typeSelected = false;

    msgs: Message[];
    uploadedFiles: any[] = [];

    @ViewChild('stepper') stepper: MatStepper;

    constructor(private router: Router, private _formBuilder: FormBuilder, private backendService: BackendService, private dialog: MatDialog) {
        console.log(uuid());
    }

    ngOnInit() {

        this.projectTypeForm = this._formBuilder.group({
            FunctionalTesting: new FormControl(null),
            VoiceAutomation: new FormControl(null),
            PerformanceTesting: new FormControl(null),
            LoadTesting: new FormControl(null),
            BrowserTesting: new FormControl(null),
            MobileTesting: new FormControl(null)
        });
        this.testSuiteForm = this._formBuilder.group({
            FunctionsTest: new FormControl(null),
            RegressionTest: new FormControl(null),
            ServiceTest: new FormControl(null)
        });
        this.environmentForm = this._formBuilder.group({
            Development: new FormControl(null),
            QA: new FormControl(null),
            Staging: new FormControl(null),
            Production: new FormControl(null)
        });

        this.projectTypeChanges();
        this.testSuiteTypeChanges();
        this.environmentFormChanges();
    }

    kwGroupTest(val){
        if(val !== "IoT Device"){
            if(_.findIndex(this.testSuiteTypes[0].tests, function(t) { return t.name === 'Keyword Group Test'; }) != -1){
                _.remove(this.testSuiteTypes[0].tests, (t)=>{
                    return t.name === "Keyword Group Test";
                });
            }
        }else{
            if(_.findIndex(this.testSuiteTypes[0].tests, function(t) { return t.name === 'Keyword Group Test'; }) == -1){
                this.testSuiteTypes[0].tests.push(
                    {name: 'Keyword Group Test'}
                );
            }
        }
    }

    testGroupSelectionClicked(){
        //this.selected.projectType = "";
        this.stepper.next();
    }

    projectTypeChanges() {
        this.projectTypeForm.get('FunctionalTesting').valueChanges.subscribe(val => {
            if (val) {
                this.selected.projectTypeLabel = "FunctionalTesting";
                this.kwGroupTest(val);
                this.stepper.next();
                this.selected.projectType = val;
                this.projectTypeForm.patchValue({VoiceAutomation: '', PerformanceTesting: '', LoadTesting: '', BrowserTesting: '', MobileTesting: ''});
            }
        });
        this.projectTypeForm.get('VoiceAutomation').valueChanges.subscribe(val => {
            if (val) {
                this.selected.projectTypeLabel = "VoiceAutomation";
                this.kwGroupTest(val);
                console.log(val);
                this.stepper.next();
                this.selected.projectType = val;
                this.projectTypeForm.patchValue({FunctionalTesting: '', PerformanceTesting: '', LoadTesting: '', BrowserTesting: '', MobileTesting: ''});
            }
        });
        this.projectTypeForm.get('PerformanceTesting').valueChanges.subscribe(val => {
            if (val) {
                this.selected.projectTypeLabel = "PerformanceTesting";
                this.kwGroupTest(val);
                console.log(val);
                this.stepper.next();
                this.selected.projectType = val;
                this.projectTypeForm.patchValue({FunctionalTesting: '', VoiceAutomation: '', LoadTesting: '', BrowserTesting: '', MobileTesting: ''});
            }
        });
        this.projectTypeForm.get('LoadTesting').valueChanges.subscribe(val => {
            if (val) {
                this.selected.projectTypeLabel = "LoadTesting";
                console.log(val);
                this.kwGroupTest(val);
                this.stepper.next();
                this.selected.projectType = val;
                this.projectTypeForm.patchValue({FunctionalTesting: '', VoiceAutomation: '', PerformanceTesting: '', BrowserTesting: '', MobileTesting: ''});
            }
        });
        this.projectTypeForm.get('BrowserTesting').valueChanges.subscribe(val => {
            if (val) {
                this.selected.projectTypeLabel = "BrowserTesting";
                console.log(val);
                this.kwGroupTest(val);
                this.stepper.next();
                this.selected.projectType = val;
                this.projectTypeForm.patchValue({FunctionalTesting: '', VoiceAutomation: '', PerformanceTesting: '', LoadTesting: '', MobileTesting: ''});
            }
        });
        this.projectTypeForm.get('MobileTesting').valueChanges.subscribe(val => {
            if (val) {
                this.selected.projectTypeLabel = "MobileTesting";
                console.log(val);
                this.kwGroupTest(val);
                this.stepper.next();
                this.selected.projectType = val;
                this.projectTypeForm.patchValue({FunctionalTesting: '', VoiceAutomation: '', PerformanceTesting: '', LoadTesting: '', BrowserTesting: ''});
            }
        });
    }

    testSuiteTypeChanges() {
        this.testSuiteForm.get('FunctionsTest').valueChanges.subscribe(val => {
            if (val) {
                console.log(val);
                this.stepper.next();
                this.selected.testSuite = val;
                this.testSuiteForm.patchValue({RegressionTest: '', ServiceTest: ''});
            }
        });
        this.testSuiteForm.get('RegressionTest').valueChanges.subscribe(val => {
            if (val) {
                console.log(val);
                this.stepper.next();
                this.selected.testSuite = val;
                this.testSuiteForm.patchValue({FunctionsTest: '', ServiceTest: ''});
            }
        });
        this.testSuiteForm.get('ServiceTest').valueChanges.subscribe(val => {
            if (val) {
                console.log(val);
                this.stepper.next();
                this.selected.testSuite = val;
                this.testSuiteForm.patchValue({FunctionsTest: '', RegressionTest: ''});
            }
        });
    }

    environmentFormChanges() {
        this.environmentForm.get('Development').valueChanges.subscribe(val => {
            if (val) {
                console.log(val);
                this.stepper.next();
                this.selected.environment = val;
                this.environmentForm.patchValue({QA: '', Staging: '', Production: ''});
            }
        });
        this.environmentForm.get('QA').valueChanges.subscribe(val => {
            if (val) {
                console.log(val);
                this.stepper.next();
                this.selected.environment = val;
                this.environmentForm.patchValue({Development: '', Staging: '', Production: ''});
            }
        });
        this.environmentForm.get('Staging').valueChanges.subscribe(val => {
            if (val) {
                console.log(val);
                this.stepper.next();
                this.selected.environment = val;
                this.environmentForm.patchValue({Development: '', QA: '', Production: ''});
            }
        });
        this.environmentForm.get('Production').valueChanges.subscribe(val => {
            if (val) {
                console.log(val);
                this.stepper.next();
                this.selected.environment = val;
                this.environmentForm.patchValue({Development: '', QA: '', Staging: ''});
            }
        });
    }

    testTypeChanged(event) {
        let resp = <TestTypeResponseModel>event;
        this.selected.selectedTestSuite = resp.SelectedTestSuite;
        this.selected.showResultsFor = resp.ShowResultsFor;
        this.selected.scriptsSelected = resp.ScriptsSelected;

        this.selected.testScenario = resp.TestScenario;
        this.selected.testDetailsPayload = resp.TestDetailsPayload;
        console.log(resp);
        if(resp.TestDetailsPayload.typeName === "SingleTestIotModel"){
            console.log(resp.TestDetailsPayload);
            this.selected.pin = resp.TestDetailsPayload.PIN;
        }

        this.selected.pin = resp.PIN;
        this.selected.typeName = resp.TestDetailsPayload.typeName;

        // this.selected.singleTestDetails = event.singleTestDetails;
        if (event.selectedTestSuite === 'Ad-Hoc Test') {
            this.scriptsSelectedLabel = 'Random Scripts';
        } else if (event.selectedTestSuite === 'Smoke Test and Sanity Check') {
            this.scriptsSelectedLabel = event.scriptsSelected.length + ' scripts selected';
        }
        if (event.selectedTestSuite === 'Keyword Group Test') {
            this.selected.testSuite = 'Keyword Group Test';
        }

        this.stepper.next();
    }

    runTestClicked() {
        console.clear();
        let payload = this.selected;
        payload['id'] = "00"+Math.floor(1000 + Math.random() * 9000);
        payload['status'] = 'New';
        console.log(payload);

        this.backendService.createTest(payload).subscribe(resp => {
            console.log(resp);
            if(this.selected.projectTypeLabel === "BrowserTesting" || this.selected.projectTypeLabel === "MobileTesting"){
                this.router.navigate(['/selenium/'+payload['id']]);
            }else if(this.selected.projectTypeLabel === "LoadTesting"){
                this.router.navigate(['/load-testing/'+payload['id']]);
            }else{
                this.router.navigate(['/logs/'+payload['id']]);
            }
        }, error => {
            console.log(error);
        });
        // if(this.selected.projectTypeLabel === "BrowserTesting"){
        //     let payload = {
        //         id: this.selected.testDetailsPayload.TestLibrary[0].Params[0].Value
        //     };
        //     this.backendService.createSeleniumTest(payload).subscribe(resp => {
        //         console.log(resp);
        //         return;
        //         //this.router.navigate(['/selenium-results/'+]);
        //     }, error => {
        //         console.log(error);
        //     });
        // }else{
        //     this.backendService.createTest(payload).subscribe(resp => {
        //         console.log(resp);
        //         this.router.navigate(['/logs/'+payload['id']]);
        //     }, error => {
        //         console.log(error);
        //     });
        // }

    }
    name: string;
    savePreset(){
        console.clear();
        let dialogRef = this.dialog.open(PresetNameComponent, {
            data:{name: ""}
        });
        dialogRef.afterClosed().subscribe(name => {
            let payload = this.selected;
            payload['id'] = "00"+Math.floor(1000 + Math.random() * 9000);
            payload['status'] = 'New';
            payload['presetName'] = name;
            console.log(payload);
            this.backendService.createPreset(payload).subscribe(resp => {
                console.log(resp);
                //this.router.navigate(['/presets/'+payload['id']]);
            }, error => {
                console.log(error);
            });
        });

    }
}
