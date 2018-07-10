import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: 'app-upload-new-scripts-dialog',
    templateUrl: './upload-new-scripts-dialog.component.html',
    styleUrls: ['./upload-new-scripts-dialog.component.scss']
})
export class UploadNewScriptsDialogComponent implements OnInit {

    fileSelected: boolean = false;
    isLoading: boolean = false;

    constructor() {
    }

    ngOnInit() {

    }

    handleFileInput(files) {
        this.isLoading = true;
        setTimeout(() => {

                if (files.length) {
                    this.isLoading = false;
                    this.fileSelected = true;
                }
            }, 2000
        )
    }

}
