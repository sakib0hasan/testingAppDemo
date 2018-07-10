import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {DeletePresetDialogComponent} from "../dialogs/delete-preset-dialog/delete-preset-dialog.component";
import {BackendService} from '../service/backend.service';

@Component({
    selector: 'app-preset-details',
    templateUrl: './preset-details.component.html',
    styleUrls: ['./preset-details.component.scss']
})
export class PresetDetailsComponent implements OnInit {
    preset = {};
    paramsId = '';
    testList = [
        // {
        //     "testNo": "1",
        //     "testLibrary": "Account",
        //     "testCase": "Login",
        //     "params": "",
        //     "string": "Enter Voice Command Text Here"
        // },
        // {
        //     "testNo": "2",
        //     "testLibrary": "Account",
        //     "testCase": "Logout",
        //     "params": "",
        //     "string": "Enter Voice Command Text Here"
        // },
        // {
        //     "testNo": "3",
        //     "testLibrary": "Account",
        //     "testCase": "Thermostat Status",
        //     "params": "",
        //     "string": "Enter Voice Command Text Here"
        // },
        // {
        //     "testNo": "4",
        //     "testLibrary": "Account",
        //     "testCase": "Change Password",
        //     "params": "Old Password, New Password",
        //     "string": "Enter Voice Command Text Here"
        // },
        // {
        //     "testNo": "5",
        //     "testLibrary": "Account",
        //     "testCase": "Total Power Savings",
        //     "params": "",
        //     "string": "Enter Voice Command Text Here"
        // },
        // {
        //     "testNo": "6",
        //     "testLibrary": "Temperature Control",
        //     "testCase": "Change Temperature",
        //     "params": "72",
        //     "string": "Enter Voice Command Text Here"
        // }
    ];
    authInformation: any = {
        "email": "abc@gmail.com",
        "password": "123456",
        "pin": "1234"
    };
    IoTDevice: string = 'Alexa';
    IoTDevices = [
        'Alexa'
    ];
    showResultsFunctionality = true;
    checkBoxDisabled = true;
    checkBoxAlign = "start";
    checkBoxPerformance = true;
    scriptSettings: string = 'Authenticate only Once';
    scripts = [
        'Authenticate only Once',
        'Authenticate with every script'
    ];

    currentServer: string = 'DevServer1';
    environments = [
        'DevServer1',
        'DevServer2',
        'QAServer1',
        'QAServer2',
        'StagingServer1',
        'StagingServer2',
        'ProductionServer'
    ];

    constructor(private backendService: BackendService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.paramsId = params.id;
                this.backendService.getPresetDetails({id: this.paramsId}).subscribe(
                    resp => {
                        this.preset = resp['presets'];

                        this.authInformation["email"] = this.preset['testDetailsPayload'].Email;
                        this.authInformation["password"] = this.preset['testDetailsPayload'].Password;
                        this.authInformation["pin"] = this.preset['testDetailsPayload'].PIN;

                        this.preset['testDetailsPayload']['TestLibrary'].forEach(tl => {
                            this.testList.push(
                                {
                                    "testLibrary": tl.TestLibrary,
                                    "testCase": tl.ScriptName,
                                    "params": tl.Params[0] ? tl.Params[0].value : "",
                                    "string": tl.Params[0] ? tl.Params[0].name : ""
                                }
                            );
                        });
                        if(this.preset['testDetailsPayload']['ScriptSetting'] === "AuthenticateOnce"){
                            this.scriptSettings = 'Authenticate only Once';
                        }else{
                            this.scriptSettings = 'Authenticate with every script';
                        }
                        this.currentServer = this.preset['environment'];
                    }, error => {
                        console.log(error);
                    }
                )
            } else {

            }
        });

    }

    deleteThePreset = function (id) {
        this.dialog.open(DeletePresetDialogComponent, {
            data: {
                presetId: id
            }
        });
    };

    backToPresets() {
        this.router.navigate(['/presets']);
    }

    ngOnInit() {
    }

    runPreset(id){
        let payload = {
            id: id
        };
        this.backendService.runPreset(payload).subscribe(
            resp => {
                console.log(resp);
                this.router.navigate(['/logs/'+payload['id']]);
            }, err => {
                console.log(err);
            }
        );
    }

}
