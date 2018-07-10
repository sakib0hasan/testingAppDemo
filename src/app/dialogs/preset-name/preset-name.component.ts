import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-preset-name',
    templateUrl: './preset-name.component.html',
    styleUrls: ['./preset-name.component.scss']
})
export class PresetNameComponent implements OnInit {
    name : string = "";
    constructor(
        public dialogRef: MatDialogRef<PresetNameComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    ngOnInit() {
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    onClose(): void {
        this.dialogRef.close(this.name);
    }
}
