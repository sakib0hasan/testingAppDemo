import {Component, OnInit} from '@angular/core';
import {FilterPipe} from "../pipes/filter.pipe";

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {UploadNewScriptsDialogComponent} from "../dialogs/upload-new-scripts-dialog/upload-new-scripts-dialog.component";
import {BackendService} from '../service/backend.service';

@Component({
    selector: 'app-test-library',
    templateUrl: './test-library.component.html',
    styleUrls: ['./test-library.component.scss']
})
export class TestLibraryComponent implements OnInit {

    searchText : string = '';
    fakeScript: any[] = [];

    scripts: any[] = [
        // {
        //     projectType: 'IoT Automation - Alexa',
        //     libraryName: 'Account',
        //     scriptName: 'Login',
        //     requiredParams: 'None',
        //     jmxUrl: ''
        // },
        // {
        //     projectType: 'All',
        //     libraryName: 'Turn on/off',
        //     scriptName: 'Turn on',
        //     requiredParams: 'None',
        //     jmxUrl: ''
        // },
        // {
        //     projectType: 'All',
        //     libraryName: 'Turn on/off',
        //     scriptName: 'Turn off',
        //     requiredParams: 'None',
        //     jmxUrl: ''
        // },
        // {
        //     projectType: 'IoT Automation - Alexa',
        //     libraryName: 'Account',
        //     scriptName: 'Logout',
        //     requiredParams: 'None',
        //     jmxUrl: ''
        // }
    ];

    constructor(private filter: FilterPipe, private dialog: MatDialog, private backendService: BackendService) {
        this.searchChanged();
        this.backendService.getAllTestLibrary().subscribe(
            resp => {
                console.log(resp);
                this.scripts = resp['testLibrary'];
            }, err => {
                console.log(err);
            }
        )
    }

    searchChanged(){
        this.fakeScript = this.filter.transform(this.scripts, this.searchText);
    }

    openUploadNewScriptsDialog(){
        let dialogRef = this.dialog.open(UploadNewScriptsDialogComponent, {
            data: {
                name: 'Test Name'
            }
        });
        dialogRef.afterClosed().subscribe(name => {
            this.backendService.createTestLibrary().subscribe(
                resp => {
                    console.log(resp);
                    this.backendService.getAllTestLibrary().subscribe(
                        resp => {
                            console.log(resp);
                            this.scripts = resp['testLibrary'];
                        }, err => {
                            console.log(err);
                        }
                    )
                }, err => {
                    console.log(err);
                }
            )
        });
    }

    ngOnInit() {}
    downloadJMXTemplate(){
        window.location.href="/assets/Optimo_JMX_Template.jmx";
    }
}
