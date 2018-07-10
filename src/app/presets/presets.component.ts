import { Component, OnInit } from '@angular/core';

import  { CommonFilterPipe } from "../pipes/common-filter.pipe";

import {v4 as uuid} from 'uuid';
import {Router} from "@angular/router";
import {BackendService} from '../service/backend.service';

@Component({
  selector: 'app-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.css']
})
export class PresetsComponent implements OnInit {

    searchText : string = '';
    filteredPresets: any[] = [];

    presets: any[] = [
        // {
        //     id: uuid(),
        //     name: 'Dilip_Alex_Test_Preset',
        //     projectType: 'Iot Automation - Alexa',
        //     testSuite: 'Single Test',
        //     testType: 'Turn on/off'
        // },
        // {
        //     id: uuid(),
        //     name: 'Erik_API_Turn_on',
        //     projectType: 'Iot Automation - API',
        //     testSuite: 'Single Test',
        //     testType: 'Turn on/off'
        // },
        // {
        //     id: uuid(),
        //     name: 'Thomas_Alexa_AccGroup',
        //     projectType: 'Iot Automation - Alexa',
        //     testSuite: 'Grouped Keyword Test',
        //     testType: 'Account (4)'
        // }
    ];

    filterIndexIgnores = ['id'];

    constructor(private backendService: BackendService, private filter: CommonFilterPipe, private router: Router) {
        this.searchChanged();
        this.backendService.getAllPresets().subscribe(
            resp => {
                this.presets = resp['presets'];
                // resp.['data']['presets'].forEach(r => {
                //     this.presets.push(r);
                // });
            }, err => {
                console.log(err)
            }
        );
    }


    presetClicked(preset){
        this.router.navigate(['/presets/'+preset.id]);
    }

    searchChanged(){
        this.filteredPresets = this.filter.transform(this.presets, this.searchText, this.filterIndexIgnores);
    }

    openUploadNewScriptsDialog(){

    }

    ngOnInit() {}

}
