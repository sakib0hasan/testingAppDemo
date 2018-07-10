import {Component, OnInit} from '@angular/core';
import {BackendService} from '../service/backend.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-performance-testing-report',
    templateUrl: './performance-testing-report.component.html',
    styleUrls: ['./performance-testing-report.component.scss']
})
export class PerformanceTestingReportComponent implements OnInit {

    loading = true;
    reportLink: SafeResourceUrl;
    constructor(public sanitizer:DomSanitizer, private router: Router, private route: ActivatedRoute, private backendService: BackendService) {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.backendService.initiateLoadTest({id: params.id}).subscribe(
                    data => {
                        this.loading = false;
                        if (environment.production) {
                            this.reportLink = this.sanitizer.bypassSecurityTrustResourceUrl("http://76.8.60.109:5000/report/"+data['id']+"/");
                        }else{
                            this.reportLink = this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost:5000/report/"+data['id']+"/");
                        }


                        console.log(data);
                    }, err => {
                        console.log(err);
                    }
                );
            }
        });
    }

    ngOnInit() {
    }

}
