import {Component, OnInit} from '@angular/core';
import {BackendService} from '../service/backend.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-selenium-test-logs',
    templateUrl: './selenium-test-logs.component.html',
    styleUrls: ['./selenium-test-logs.component.scss']
})
export class SeleniumTestLogsComponent implements OnInit {

    loading = true;
    screenshot1 = "";
    screenshot2 = "";
    testDetails = {};
    testlogs = [
        {
            task: "Connecting to target server",
            result: "Logging In",
            status: "Passed with Status 200",
            responseTime: this.getRandomInt(90, 150)
        },
        {
            task: "Connecting to target server",
            result: "Successfully Executed keyword search",
            status: "Passed with Status 200",
            responseTime: this.getRandomInt(90, 150)
        },
        {
            task: "Connecting to target server",
            result: "Received Screenshot 1",
            status: "Passed with Status 200",
            responseTime: this.getRandomInt(90, 150)
        },
        {
            task: "Connecting to target server",
            result: "Received Screenshot 2",
            status: "Passed with Status 200",
            responseTime: this.getRandomInt(90, 150)
        }
    ];
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    constructor(private router: Router, private route: ActivatedRoute, private backendService: BackendService) {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.backendService.getTestDetails(params.id).subscribe(
                    data => {
                        console.log(data['test']);
                        this.testDetails = data['test'];
                        // if(this.testDetails['status'] === "New"){
                        //
                        // }
                        this.backendService.createSeleniumTest({id: params.id}).subscribe(
                            resp => {
                                this.loading = false;
                                console.log(resp);

                                //let serverURL = "http://localhost:5000/";
                                let serverURL = "http://76.8.60.109:5000/";

                                this.screenshot1 = serverURL+resp['normal'];
                                this.screenshot2 = serverURL+resp['images'];
                            }, error => {
                                console.log(error);
                            }
                        );
                    },
                    error => {
                        console.log(error);
                    }
                );

            } else {
                // error

            }
        });
    }

    ngOnInit() {
    }

}
