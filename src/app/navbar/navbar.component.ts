import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    title = '';

    constructor(private router: Router, route: ActivatedRoute) {
        router.events
            .filter(e => e instanceof NavigationEnd)
            .forEach(e => {
                this.title = route.root.firstChild.snapshot.data['title'];
            });
    }

    ngOnInit() {
    }

}
