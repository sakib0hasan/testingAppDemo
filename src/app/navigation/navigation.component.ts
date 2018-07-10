import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    navItems = [
        {
            title: 'Test Creator',
            route: '/test',
            icon: 'fa-list-alt'
        },
        {
            title: 'Reports',
            route: 'logs',
            icon: 'fa-history'
        },
        {
            title: 'Presets',
            route: '/presets',
            icon: 'fa-save',
        },
        {
            title: 'Test Library',
            route: '/test-library',
            icon: 'fa-book',
        },
        {
            title: 'Scheduler',
            route: '/scheduler',
            icon: 'fa-clock-o'
        }
    ];

    options: FormGroup;

    constructor(fb: FormBuilder) {
        this.options = fb.group({
            'fixed': false,
            'top': 0,
            'bottom': 0,
        });
    }

    shouldRun = true;

    ngOnInit() {
    }

    working(item){

    }

}
