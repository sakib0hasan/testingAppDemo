import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {BackendService} from '../service/backend.service';
import {Message} from 'primeng/primeng';
import * as _ from 'lodash';

import {PapaParseService} from 'ngx-papaparse';
import {Param, SingleTestIotModel, TestLibraryScript} from '../models/single-test-iot.model';
import {SingleTestApiModel, TestLibraryScriptApi} from '../models/single-test-api.model';
import {PINType, TestTypeResponseModel} from '../models/test-type-response.model';
import {PerformanceTestingIotModel} from '../models/performance-testing-iot.model';
import {PerformanceTestingApiModel} from '../models/performance-testing-api.model';
import {LoadTestingModel} from '../models/load-testing.model';

@Component({
    selector: 'app-test-type-panel',
    templateUrl: './test-type-panel.component.html',
    styleUrls: ['./test-type-panel.component.css']
})
export class TestTypePanelComponent implements OnInit {
    @Input() selectedTestSuite: any;
    @Input() selectedProjectTypeLabel: any;
    @Input() selectedProjectType: any;
    @Output() testTypeChangedEvent = new EventEmitter<any>();
    testTypes = [];
    msgs: Message[];
    uploadedFiles: any[] = [];
    typeSelected = false;
    showResultsFor: string[] = ['Functionality', 'Performance'];
    scriptsSelected: string[] = [];
    pinSpecifications: string = '';
    testScenario: string = 'Pass';
    manualPin: string = '';

    csvFile: any;
    csvFileError: boolean;
    csvTestList = [];
    csvFileParsingDone: boolean;
    csvAuthInformation: any;
    csvIoTDevice: string = 'Alexa';
    csvIoTDevices = [
        'Alexa'
    ];
    csvShowResultsFunctionality = true;
    csvCheckBoxDisabled = true;
    csvCheckBoxAlign = 'start';
    csvCheckBoxPerformance = true;
    csvScriptSettings: string = 'Authenticate only Once';
    csvScripts = [
        'Authenticate only Once',
        'Authenticate with every script'
    ];

    parameters = [
        {
            name: 'pin',
            label: '4 Digit Pin',
            value: ''
        }
    ];
    emailAddress: string = '';
    password: string = '';
    pin: string = '';

    testTemplateScripts = [
        {
            testLibrary: 'Account',
            testCases: [
                {
                    name: 'Login',
                    params: []
                },
                {
                    name: 'Logout',
                    params: []
                },
                {
                    name: 'Thermostat Status',
                    params: []
                },
                {
                    name: 'Change Password',
                    params: [
                        {
                            name: 'Old Password',
                            value: ''
                        },
                        {
                            name: 'New Password',
                            value: ''
                        }
                    ]
                },
                {
                    name: 'Total Power Savings',
                    params: []
                }
            ]
        },
        {
            testLibrary: 'Temperature Control',
            testCases: [
                {
                    name: 'Change Temperature',
                    params: [
                        {
                            name: 'Number in Fahrenheit',
                            value: ''
                        }
                    ]
                }
            ]
        },
        {
            testLibrary: 'Temperature Mode',
            testCases: [
                {
                    name: 'Cooling',
                    params: []
                },
                {
                    name: 'Heating',
                    params: []
                },
                {
                    name: 'Fan',
                    params: []
                }
            ]
        },
        {
            testLibrary: 'Turn On/Off',
            testCases: [
                {
                    name: 'On',
                    params: []
                },
                {
                    name: 'Off',
                    params: []
                }
            ]
        },
        {
            testLibrary: 'Reading',
            testCases: [
                {
                    name: 'Current Status',
                    params: []
                },
                {
                    name: 'Room Temperature',
                    params: []
                }
            ]
        }
    ];

    selectedTestTemplate = {
        testLibrary: '',
        testCases: []
    };
    selectedTestTemplateScript = {
        name: '',
        params: []
    };
    selectedTestTemplateScriptDummy = '';
    IoTDevice = 'Alexa';
    IoTCommand = '';

    viewHandler = {
        showUpload: false,
        showDropDown: false,
        showScriptList: false,
        showResultsFor: false
    };

    singleTestCases = [];
    scriptSetting = 'AuthenticateOnce';

    accent = "English";

    // Performance
    requestConfiguration = "";
    loops = 0;

    // Load
    loadType = "Ramp";
    threads = 0;
    ramPeriod = 0;

    addToSingleCases() {
        let selectedTestTemplate = _.cloneDeep(this.selectedTestTemplate);
        let selectedTestTemplateScript = _.cloneDeep(this.selectedTestTemplateScript);
        let ioTcommand = _.cloneDeep(this.IoTCommand);
        this.singleTestCases.push(
            {
                testLibrary: selectedTestTemplate.testLibrary,
                selectedTestTemplateScript: selectedTestTemplateScript,
                ioTCommand: ioTcommand
            }
        );
    }

    removeSingleTestCase(i) {
        this.singleTestCases.splice(i, 1);
    }

    testTemplateScriptSelected(test) {
        this.selectedTestTemplateScript = test;
    }

    constructor(private backendService: BackendService, private csvParseService: PapaParseService) {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.selectedTestSuite) {
            this.selectedTestSuite = changes.selectedTestSuite.currentValue;

            this.getTestTypes(this.selectedTestSuite);
            if (this.selectedTestSuite === 'Smoke Test and Sanity Check') {
                this.viewHandler.showDropDown = false;
                this.viewHandler.showUpload = false;
                this.viewHandler.showScriptList = true;
            } else if (this.selectedTestSuite === 'Single Test') {
                this.viewHandler.showDropDown = true;
                this.viewHandler.showUpload = true;
                this.viewHandler.showScriptList = false;
            } else if (this.selectedTestSuite === 'Ad-Hoc Test') {
                this.viewHandler.showDropDown = false;
                this.viewHandler.showUpload = false;
                this.viewHandler.showScriptList = false;
            } else if (this.selectedTestSuite === 'Positive Test' || this.selectedTestSuite === 'Negative Test') {
                this.viewHandler.showScriptList = true;
            } else if (this.selectedTestSuite === 'Keyword Group Test') {
                this.viewHandler.showScriptList = false;
            }
        }else if(this.selectedProjectType){
            console.log(this.selectedProjectType);
            if(this.selectedProjectType === "Chrome" || this.selectedProjectType === "Firefox" || this.selectedProjectType === "iOS" || this.selectedProjectType === "Android" || this.selectedProjectType === "Blackberry"){
                this.testTemplateScripts = [
                    {
                        testLibrary: 'Google',
                        testCases: [
                            {
                                name: 'Keyword Search',
                                params: [
                                    {
                                        name: 'keyword',
                                        value: ''
                                    },
                                ]
                            },
                            {
                                name: 'Images Search',
                                params: [
                                    {
                                        name: 'keyword',
                                        value: ''
                                    },
                                ]
                            }
                        ]
                    }];
            }else{
                this.testTemplateScripts = [
                    {
                        testLibrary: 'Account',
                        testCases: [
                            {
                                name: 'Login',
                                params: []
                            },
                            {
                                name: 'Logout',
                                params: []
                            },
                            {
                                name: 'Thermostat Status',
                                params: []
                            },
                            {
                                name: 'Change Password',
                                params: [
                                    {
                                        name: 'Old Password',
                                        value: ''
                                    },
                                    {
                                        name: 'New Password',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'Total Power Savings',
                                params: []
                            }
                        ]
                    },
                    {
                        testLibrary: 'Temperature Control',
                        testCases: [
                            {
                                name: 'Change Temperature',
                                params: [
                                    {
                                        name: 'Number in Fahrenheit',
                                        value: ''
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        testLibrary: 'Temperature Mode',
                        testCases: [
                            {
                                name: 'Cooling',
                                params: []
                            },
                            {
                                name: 'Heating',
                                params: []
                            },
                            {
                                name: 'Fan',
                                params: []
                            }
                        ]
                    },
                    {
                        testLibrary: 'Turn On/Off',
                        testCases: [
                            {
                                name: 'On',
                                params: []
                            },
                            {
                                name: 'Off',
                                params: []
                            }
                        ]
                    },
                    {
                        testLibrary: 'Reading',
                        testCases: [
                            {
                                name: 'Current Status',
                                params: []
                            },
                            {
                                name: 'Room Temperature',
                                params: []
                            }
                        ]
                    }
                ];
            }
        }
    }

    processCSVFileData(data) {

        this.csvFileParsingDone = false;

        this.csvFileError = false;

        if (!data) {
            this.csvFileError = true;
            return;
        }

        if (data.length < 6) {
            this.csvFileError = true;
            return;
        }

        let emailAddress = data[0][2];
        let password = data[1][2];
        let fourDigitPin = data[2][2];

        this.csvAuthInformation = {
            email: emailAddress,
            password: password,
            pin: fourDigitPin
        };

        if (!emailAddress || !password || !fourDigitPin) {
            this.csvFileError = true;
            return;
        }

        this.csvTestList = [];

        for (let i = 5; i < data.length; i++) {

            let item = {
                testNo: data[i][0],
                testLibrary: data[i][1],
                testCase: data[i][2],
                params: data[i][3],
                string: data[i][4]
            };

            this.csvTestList.push(item);
        }

        this.csvFileParsingDone = true;

        setTimeout(() => {
            this.csvShowResultsFunctionality = true;
        }, 0);


    }

    fileUploaded(event) {
        if (event.target.files.length <= 0)
            return;
        this.csvFile = event.target.files[0];
        var url = URL.createObjectURL(this.csvFile);

        this.csvParseService.parse(this.csvFile, {
            complete: (results, file) => {
                this.processCSVFileData(results.data);
            }
        });
    }

    getTestTypes(testSuite) {
        this.backendService.getTestScripts(testSuite).subscribe(
            data => {
                this.testTypes = data['files'];
                console.log(data);
                this.scriptsSelected = [];
                this.testTypes.forEach(t => {
                    this.scriptsSelected.push(t.fileName);
                });
                console.log(this.scriptsSelected);
            },
            err => {
                console.log(err);
            }
        );
    }

    typeChanged(event) {
        // Single Test
        console.log(event);
        // this.selected.testType = event.value;
        this.typeSelected = true;
        this.scriptsSelected = [];
        this.scriptsSelected.push(event.value.fileName);
        this.viewHandler.showUpload = false;
    }

    backClicked(event) {
        console.log(event);
    }

    nextClicked(event) {
        console.log(this.selectedTestSuite);
        console.log(this.showResultsFor);
        console.log(this.scriptsSelected);
        console.log(this.pinSpecifications, this.parameters[0].value);
        // let temp = {
        //     selectedTestSuite: this.selectedTestSuite,
        //     showResultsFor: this.showResultsFor,
        //     scriptsSelected: this.scriptsSelected,
        //     pin: {
        //         type: this.pinSpecifications,
        //         value: this.parameters[0].value
        //     },
        //     testScenario: this.testScenario,
        //     singleTestDetails: {
        //         email: this.emailAddress,
        //         password: this.password,
        //         pin: this.pin,
        //         selectedTestTemplate: this.selectedTestTemplate.testLibrary,
        //         selectedTestTemplateScript: this.selectedTestTemplateScript,
        //         IoTDevice: this.IoTDevice,
        //         IoTCommand: this.IoTCommand
        //     }
        // };
        console.log(this.selectedTestSuite);
        let TestDetailsPayload = {};
        if ((this.selectedProjectType === 'API Automation' || this.selectedProjectType === 'API Only') && this.selectedTestSuite === 'Single Test') {
            let singleTestApi = new SingleTestApiModel();
            singleTestApi.PIN = this.pin;
            singleTestApi.ShowResultsFor = this.showResultsFor;
            singleTestApi.ScriptSetting = this.scriptSetting;

            let testLibraryScriptsApi: TestLibraryScriptApi[] = [];

            this.singleTestCases.forEach(tc => {
                let temp = new TestLibraryScript();
                temp.TestLibrary = tc.testLibrary;
                temp.ScriptName = tc.selectedTestTemplateScript.name;
                let params: Param[] = [];
                tc.selectedTestTemplateScript.params.forEach(p => {
                    params.push(new Param(p.name, p.value));
                });
                temp.Params = params;
                testLibraryScriptsApi.push(temp);
            });
            singleTestApi.TestLibrary = testLibraryScriptsApi;
            TestDetailsPayload = singleTestApi;


        } else if (this.selectedTestSuite === 'Single Test') {
            let singleTestIot = new SingleTestIotModel();
            singleTestIot.Email = this.emailAddress;
            singleTestIot.Password = this.password;
            singleTestIot.PIN = this.pin;
            singleTestIot.ShowResultsFor = this.showResultsFor;
            singleTestIot.ScriptSetting = this.scriptSetting;

            let testLibraryScripts: TestLibraryScript[] = [];

            this.singleTestCases.forEach(tc => {
                let temp = new TestLibraryScript();
                temp.Command = tc.ioTCommand;
                temp.TestLibrary = tc.testLibrary;
                temp.ScriptName = tc.selectedTestTemplateScript.name;

                let params: Param[] = [];
                tc.selectedTestTemplateScript.params.forEach(p => {
                    params.push(new Param(p.name, p.value));
                });
                temp.Params = params;

                testLibraryScripts.push(temp);
            });
            singleTestIot.TestLibrary = testLibraryScripts;
            TestDetailsPayload = singleTestIot;
        } else if (this.selectedProjectTypeLabel === 'PerformanceTesting' && this.selectedProjectType !== 'API Only') {
            console.log("PerformanceTesting IOT");
            let performanceTestingIOT = new PerformanceTestingIotModel();
            performanceTestingIOT.Email = this.emailAddress;
            performanceTestingIOT.Password = this.password;
            performanceTestingIOT.PIN = this.pin;

            let testLibraryScripts: TestLibraryScript[] = [];

            this.singleTestCases.forEach(tc => {
                let temp = new TestLibraryScript();
                temp.Command = tc.ioTCommand;
                temp.TestLibrary = tc.testLibrary;
                temp.ScriptName = tc.selectedTestTemplateScript.name;

                let params: Param[] = [];
                tc.selectedTestTemplateScript.params.forEach(p => {
                    params.push(new Param(p.name, p.value));
                });
                temp.Params = params;

                testLibraryScripts.push(temp);
            });
            performanceTestingIOT.TestLibrary = testLibraryScripts;
            performanceTestingIOT.ScriptSetting = this.scriptSetting;
            performanceTestingIOT.RequestConfiguration = this.requestConfiguration;
            performanceTestingIOT.Loops = this.loops;
            TestDetailsPayload = performanceTestingIOT;
        } else if (this.selectedProjectTypeLabel === 'PerformanceTesting' && this.selectedProjectType === 'API Only') {
            console.log("PerformanceTesting API");
            let performanceTestingApiModel = new PerformanceTestingApiModel();
            performanceTestingApiModel.PIN = this.pin;

            let testLibraryScriptsApi: TestLibraryScriptApi[] = [];
            this.singleTestCases.forEach(tc => {
                let temp = new TestLibraryScript();
                temp.TestLibrary = tc.testLibrary;
                temp.ScriptName = tc.selectedTestTemplateScript.name;
                let params: Param[] = [];
                tc.selectedTestTemplateScript.params.forEach(p => {
                    params.push(new Param(p.name, p.value));
                });
                temp.Params = params;
                testLibraryScriptsApi.push(temp);
            });
            performanceTestingApiModel.TestLibrary = testLibraryScriptsApi;
            performanceTestingApiModel.ScriptSetting = this.scriptSetting;
            performanceTestingApiModel.RequestConfiguration = this.requestConfiguration;
            performanceTestingApiModel.Loops = this.loops;
            TestDetailsPayload = performanceTestingApiModel;
        }else if (this.selectedProjectTypeLabel === 'LoadTesting'){
            let loadTestingModel = new LoadTestingModel();
            loadTestingModel.PIN = this.pin;
            let testLibraryScriptsApi: TestLibraryScriptApi[] = [];
            this.singleTestCases.forEach(tc => {
                let temp = new TestLibraryScript();
                temp.TestLibrary = tc.testLibrary;
                temp.ScriptName = tc.selectedTestTemplateScript.name;
                let params: Param[] = [];
                tc.selectedTestTemplateScript.params.forEach(p => {
                    params.push(new Param(p.name, p.value));
                });
                temp.Params = params;
                testLibraryScriptsApi.push(temp);
            });
            loadTestingModel.TestLibrary = testLibraryScriptsApi;
            loadTestingModel.ScriptSetting = this.scriptSetting;
            loadTestingModel.LoadType = this.loadType;
            loadTestingModel.Threads = this.threads;
            loadTestingModel.RamPeriod = this.ramPeriod;
            TestDetailsPayload = loadTestingModel;
        }

        let testTypeResponseModel = new TestTypeResponseModel();
        testTypeResponseModel.SelectedTestSuite = this.selectedTestSuite;
        testTypeResponseModel.ShowResultsFor = this.showResultsFor;
        testTypeResponseModel.ScriptsSelected = this.scriptsSelected;
        testTypeResponseModel.PIN = new PINType(this.pinSpecifications, this.parameters[0].value);
        testTypeResponseModel.TestScenario = this.testScenario;
        testTypeResponseModel.TestDetailsPayload = TestDetailsPayload;

        if (this.selectedTestSuite === 'Keyword Group Test'){
            testTypeResponseModel.SelectedTestSuite = 'Keyword Group Test';
        }

        this.testTypeChangedEvent.emit(testTypeResponseModel);
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.getTestTypes(this.selectedTestSuite);
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    ngOnInit() {

    }

    downloadCSVTemplate(){
        window.location.href="/assets/Optimo_CSV_Sample.xlsx";
    }

}
