import {Component, OnInit} from '@angular/core';
import {BackendService} from '../service/backend.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
    loading = true;
    alltests = [];

    constructor(private router: Router, private backendService: BackendService) {
        this.backendService.getAllTests().subscribe(
            data => {
                this.loading = false;
                this.alltests = data["test"];
                console.log(data["test"]);
            },
            error => {
                console.log(error);
            }
        );
    }

    ngOnInit() {

    }

    gotoTestDetails(id, type){
        console.log(id, type)
        if(type === "MobileTesting" || type === "BrowserTesting"){
            this.router.navigate(['/selenium/'+id]);
        }else if(type === "LoadTesting"){
            this.router.navigate(['/load-testing/'+id]);
        }else{
            this.router.navigate(['/logs/'+id]);
        }
    }

}
