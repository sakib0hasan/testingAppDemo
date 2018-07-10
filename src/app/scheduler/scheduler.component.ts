import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommonFilterPipe} from "../pipes/common-filter.pipe";
import {v4 as uuid} from 'uuid';
import {BackendService} from '../service/backend.service';

@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

    searchText : string = '';
    filteredSchedules: any[] = [];

    schedules: any[] = [
        // {
        //     id: uuid(),
        //     name: 'Dilip_Alex_Test_Preset',
        //     preset: 'Iot Automation - Alexa',
        //     schedule: 'Every 40 min',
        // },
        // {
        //     id: uuid(),
        //     name: 'Erik_API_Turn_on',
        //     preset: 'Iot Automation - API',
        //     schedule: 'Every Day',
        // },
        // {
        //     id: uuid(),
        //     name: 'Thomas_Alexa_AccGroup',
        //     preset: 'Iot Automation - API',
        //     schedule: 'Every 30 min',
        // }
    ];

    filterIndexIgnores = ['id'];

    constructor(private backendService: BackendService, private filter: CommonFilterPipe, private router: Router) {
        this.searchChanged();
        this.backendService.getAllSchedules().subscribe(
            resp => {
                console.log(resp);
                this.schedules = resp['schedules'];
                this.schedules.forEach(s => {
                    let presetNames = [];
                    s.presetsSelected.forEach(p => {
                        presetNames.push(p.presetName);
                    });
                    s.presetNames = presetNames.join();
                    s.schedule = s.selectedTimes.join();
                    if(s.schedule === ""){
                        s.schedule = "After every "+s.schedulerTestCustomTime+" Minutes";
                    }
                })
            }, error => {
                console.log(error)
            }
        );
    }

    scheduleClicked(schedule){
        this.router.navigate(['/schedule/'+schedule.id]);
    }

    searchChanged(){
        this.filteredSchedules = this.filter.transform(this.schedules, this.searchText, this.filterIndexIgnores);
    }



    ngOnInit() {
    }

    createNewSchedule(){
        this.router.navigate(['/scheduler/create']);
    }

    scheduleReport(schedule){
        this.router.navigate(['/scheduler/' + schedule.id]);
    }

}
