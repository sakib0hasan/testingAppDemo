import {Component, OnInit} from '@angular/core';
import {CommonFilterPipe} from '../pipes/common-filter.pipe';
import {Router} from '@angular/router';
import {v4 as uuid} from 'uuid';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {BackendService} from '../service/backend.service';


@Component({
    selector: 'app-scheduler-create',
    templateUrl: './scheduler-create.component.html',
    styleUrls: ['./scheduler-create.component.scss']
})
export class SchedulerCreateComponent implements OnInit {

    hasSelectedPreset: boolean = false;
    searchText: string = '';
    filteredPresets: any[] = [];

    presets: any[] = [];

    schedulerTestType: string = '';
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
    schedulerTestTime: string = '';
    schedulesTime = [
        {name: 'Scheduled Times per day'},
        {name: 'After every x Minutes'}
    ];


    schedulerTestName: string = '';
    emailTo: string = '';

    filterIndexIgnores = ['id', 'checkModel'];

    constructor(private backendService: BackendService, private filter: CommonFilterPipe, private router: Router, private atp: AmazingTimePickerService) {
        this.searchChanged();
        this.backendService.getAllPresets().subscribe(
            resp => {
                console.log(resp);
                this.presets = resp['presets'];
                this.presets.forEach(p => {
                    p.checkModel = false;
                });
            }, error => {
                console.log(error);
            }
        );
    }

    checkedOrUnchecked() {
        this.searchChanged();
        setTimeout(() => {
            this.hasSelectedPreset = false;
            this.presets.forEach(preset => {
                this.hasSelectedPreset = this.hasSelectedPreset || preset.checkModel;
            });
            console.log(this.hasSelectedPreset);
        });
    }

    searchChanged() {
        this.filteredPresets = this.filter.transform(this.presets, this.searchText, this.filterIndexIgnores);
        console.log(this.filteredPresets);
    }

    openUploadNewScriptsDialog() {

    }

    ngOnInit() {
    }

    selectTime() {
        const amazingTimePicker = this.atp.open();
        amazingTimePicker.afterClose().subscribe(time => {
            this.addScheduleTime(time);
        });
    }

    selectedTimes = [];

    removeTime(index) {
        this.selectedTimes = this.selectedTimes.filter((item, i) => {
            return i != index;
        });
    }

    addScheduleTime(time) {
        if (!this.selectedTimes.find((searchedTime) => {
            return searchedTime === time;
        })) {
            this.selectedTimes.push(time);
        }
    }

    startScheduleClicked(){

        let presetsSelected = [];
        this.presets.forEach(p => {
            if(p.checkModel){
                presetsSelected.push(p);
            }
        });
        let payload = {
            id: "00"+Math.floor(1000 + Math.random() * 9000),
            scheduleName: this.schedulerTestName,
            email: this.emailTo ? this.emailTo: false,
            presetsSelected: presetsSelected,
            selectedTimes: this.selectedTimes,
            schedulerTestTime: this.schedulerTestTime,
            schedulerTestType: this.schedulerTestType,
            schedulerTestCustomTime: this.schedulerTestCustomTime
        };
        console.log(payload);
        this.backendService.createSchedule(payload).subscribe(
            resp => {
                console.log(resp);
                this.router.navigate(['/scheduler/'+payload.id]);
            }, error => {
                console.log(error);
            }
        );
    }
}
