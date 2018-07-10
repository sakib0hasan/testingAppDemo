import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../service/backend.service';
import {SocketService} from '../service/socket.service';
import * as _ from 'lodash';

declare var responsiveVoice:any;

@Component({
    selector: 'app-singletest',
    templateUrl: './singletest.component.html',
    styleUrls: ['./singletest.component.css']
})
export class SingletestComponent implements OnInit {
    Math: Math = Math;
    testDetails = {};
    testLiveLogs = [];
    testLiveLogIndex = 0;
    testLogDetails = [];
    otherTests = [];
    comparisons = [];
    selectedTest: string = '';
    totalTime = 0;

    //charjs
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            xAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,
                    beginAtZero: true
                }
            }]
        },
        tooltips: {
            mode: 'nearest',
            callbacks: {
                label: (tooltipItem, data) => {
                    //console.log(this.barChartData[0].data[tooltipItem.datasetIndex],this.barChartData[1].data[tooltipItem.datasetIndex]);
                    return 'Difference: ' + (data.datasets[0].data[tooltipItem.index] - data.datasets[1].data[tooltipItem.index]) + 'ms';
                }
            }
        }
    };
    public barChartLabels: string[] = [];
    public barChartType: string = 'horizontalBar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        {data: [], label: ''},
        {data: [], label: ''}
    ];

    constructor(private router: Router, private route: ActivatedRoute, private backendService: BackendService, private socket: SocketService) {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.backendService.getTestDetails(params.id).subscribe(
                    data => {
                        //console.log(data['test']);
                        this.testDetails = data['test'];

                        this.connectToWS();
                        this.processTestDetails();
                        this.getOtherTests(params.id);
                    },
                    error => {
                        //console.log(error);
                    }
                );

            } else {
                // error

            }
        });
    }

    getOtherTests(id){
        let payload = {
            id: this.testDetails['id']
        };
        this.backendService.getAllOtherTests(payload).subscribe(
            data => {
                //console.log(data);
                this.otherTests = data['test'];
                if(data['test'].length > 0){
                    let temp = _.remove(this.otherTests, function (n) {
                        return n['id'] === id;
                    });
                    this.otherTests = data['test'];
                    //this.selectedTest = this.otherTests[0]['id'];
                    //console.log(data['test']);
                }
            },
            error => {
                //console.log(error);
            }
        );
    }

    compareChanged($event) {
        //console.log($event.value);
    }

    processTestDetails() {
        if (this.testDetails['status'] === 'New') {
        //if (true) {
            this.testDetails['status'] = "Test In progress";
            let payload = {
                id: this.testDetails['id']
            };
            this.backendService.initiateTest(payload).subscribe(
                data => {
                    //console.log(data);
                },
                error => {
                    //console.log(error);
                }
            );
        } else {
            let payload = {
                id: this.testDetails['id']
            };
            this.backendService.getTestLogs(payload).subscribe(
                data => {
                    data['logs'].forEach(l => {
                        if(l['details'] === "Authenticating Again"){
                            this.testLiveLogIndex++;
                        }

                        if(typeof this.testLogDetails[this.testLiveLogIndex] === typeof undefined){
                            this.testLogDetails[this.testLiveLogIndex] = [];
                            this.testLogDetails[this.testLiveLogIndex].push(l);
                        }else{
                            this.testLogDetails[this.testLiveLogIndex].push(l);
                        }

                    });

                    //console.log(this.testLogDetails);
                    this.testLogDetails.forEach(tld => {
                        tld.forEach(l => {
                            this.totalTime += l.responseTime;
                        });
                    });
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    connectToWS() {
        this.socket.connect(this.testDetails['id']);
        this.socket.getEventListener().subscribe(event => {
            if (event.type == 'message') {
                if (event.data['id'] === this.testDetails['id']) {
                    console.log(event.data);
                    if (event.data['details'] === 'FINISHED') {
                        console.log('test finished');
                        this.testDetails['status'] = event.data['status'];
                        this.socket.close();
                    }else if(event.data['details'] === "Authenticating Again") {
                        this.testLiveLogIndex++;
                    }else {
                        this.totalTime += parseInt(event.data['responseTime']);

                        if(typeof this.testLiveLogs[this.testLiveLogIndex] === typeof undefined){
                            this.testLiveLogs[this.testLiveLogIndex] = [];
                            this.testLiveLogs[this.testLiveLogIndex].push(event.data);
                        }else{
                            this.testLiveLogs[this.testLiveLogIndex].push(event.data);
                        }

                    }
                }
            }
            if (event.type == 'close') {
                console.log('The socket connection has been closed');
            }
            if (event.type == 'open') {
                console.log('The socket connection has been established');
            }
        });
    }

    speakCommand(command){
        //rv.speak()
        if(!command)
            return;
        responsiveVoice.speak(command);
    }

    ngOnInit() {
    }

    compareClicked() {
        let payload = {
            'firstId': this.testDetails['id'],
            'secondId': this.selectedTest['id']
        };
        this.backendService.compareTests(payload).subscribe(
            data => {
                this.comparisons = data['comparisons'];
                let lables = [];
                let fl = [];
                let sl = [];
                data['comparisons'].forEach(comp => {
                    lables.push(comp.task);
                    fl.push(comp.firstRT);
                    sl.push(comp.secondRT);
                });
                this.barChartLabels = lables;
                this.barChartData[0].data = fl;
                this.barChartData[1].data = sl;
                this.barChartData[0].label = data['comparisons'][0]['firstId'];
                this.barChartData[1].label = data['comparisons'][0]['secondId'];
            },
            error => {
                console.log(error);
            }
        );
    }


    routerCanDeactivate() {
        this.socket.close();
        return true; // false stops navigation, true continue navigation
    }

    ngOnDestroy() {
        console.log('connection closed');
        this.socket.close();
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
