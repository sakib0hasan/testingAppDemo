import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NavigationComponent} from './navigation/navigation.component';
import {RouterModule, Routes} from '@angular/router';
import {LogsComponent} from './logs/logs.component';
import {PresetsComponent} from './presets/presets.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TestCreatorComponent} from './test-creator/test-creator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AmazingTimePickerModule, AmazingTimePickerService} from 'amazing-time-picker';
import {
    MatButtonModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatIconModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatStepperModule, MatSidenavModule, MatToolbarModule, MatListModule, MatSelectionList, MatButtonToggleModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {BackendService} from './service/backend.service';
import {FileUploadModule} from 'primeng/components/fileupload/fileupload';
import {GrowlModule} from 'primeng/growl';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {StepsModule} from 'primeng/steps';
import {TestTypePanelComponent} from './test-type-panel/test-type-panel.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SingletestComponent} from './singletest/singletest.component';
import {SocketService} from './service/socket.service';
import {HttpModule} from '@angular/http';
import {AccordionModule} from 'primeng/accordion';
import {DropdownModule} from 'primeng/dropdown';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {ProgressBarModule} from 'primeng/progressbar';
import {PapaParseModule} from 'ngx-papaparse';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {CommonModule} from '@angular/common';
import {MatRadioModule} from '@angular/material';
import {TestLibraryComponent} from './test-library/test-library.component';
import {FilterPipe} from './pipes/filter.pipe';
import {UploadNewScriptsDialogComponent} from './dialogs/upload-new-scripts-dialog/upload-new-scripts-dialog.component';
import {CommonFilterPipe} from './pipes/common-filter.pipe';
import {PresetDetailsComponent} from './preset-details/preset-details.component';
import {DeletePresetDialogComponent} from './dialogs/delete-preset-dialog/delete-preset-dialog.component';
import {SchedulerComponent} from './scheduler/scheduler.component';
import {SchedulerCreateComponent} from './scheduler-create/scheduler-create.component';
import {SchedulerDetailsComponent} from './scheduler-details/scheduler-details.component';
import {SchedulerTestsComponent} from './scheduler-tests/scheduler-tests.component';
import {SchedulerTestReportsComponent} from './scheduler-test-reports/scheduler-test-reports.component';
import { PresetNameComponent } from './dialogs/preset-name/preset-name.component';
import { SeleniumTestLogsComponent } from './selenium-test-logs/selenium-test-logs.component';
import { PerformanceTestingReportComponent } from './performance-testing-report/performance-testing-report.component';

const appRoutes: Routes = [
    {path: 'test', component: TestCreatorComponent, data: {title: 'Test Creator'}},
    {path: 'logs', component: LogsComponent, data: {title: 'Reports'}},
    {path: 'selenium/:id', component: SeleniumTestLogsComponent, data: {title: 'Selenium Reports'}},
    {path: 'load-testing/:id', component: PerformanceTestingReportComponent, data: {title: 'Load Testing Report'}},
    {path: 'scheduler', component: SchedulerComponent, data: {title: 'Scheduler'}},
    {path: 'scheduler/create', component: SchedulerCreateComponent, data: {title: 'Create Scheduler'}},
    {path: 'scheduler/:id', component: SchedulerDetailsComponent, data: {title: 'Scheduler Details'}},
    {path: 'scheduler/:id/tests', component: SchedulerTestsComponent, data: {title: 'Scheduler Tests'}},
    {path: 'scheduler/:id/tests/:testId', component: SchedulerTestReportsComponent, data: {title: 'Scheduler Test Reports'}},
    {path: 'test-library', component: TestLibraryComponent, data: {title: 'Test Library'}},
    {path: 'logs/:id', component: SingletestComponent, data: {title: 'Test Details'}},
    {path: 'presets', component: PresetsComponent, data: {title: 'Presets'}},
    {path: 'presets/:id', component: PresetDetailsComponent, data: {title: 'Preset Details'}},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        NavigationComponent,
        LogsComponent,
        PresetsComponent,
        PageNotFoundComponent,
        TestCreatorComponent,
        TestTypePanelComponent,
        SingletestComponent,
        TestLibraryComponent,
        FilterPipe,
        CommonFilterPipe,
        UploadNewScriptsDialogComponent,
        PresetDetailsComponent,
        DeletePresetDialogComponent,
        SchedulerComponent,
        SchedulerCreateComponent,
        SchedulerDetailsComponent,
        SchedulerTestsComponent,
        SchedulerTestReportsComponent,
        PresetNameComponent,
        SeleniumTestLogsComponent,
        PerformanceTestingReportComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes
        ),
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        MatSelectModule,
        HttpClientModule,
        FileUploadModule,
        GrowlModule,
        InputTextModule,
        CheckboxModule,
        CommonModule,
        StepsModule,
        RadioButtonModule,
        MatRadioModule,
        HttpModule,
        AccordionModule,
        DropdownModule,
        MatCheckboxModule,
        ChartsModule,
        ProgressBarModule,
        PapaParseModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        AmazingTimePickerModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatButtonToggleModule

    ],
    providers: [
        BackendService,
        SocketService,
        CommonFilterPipe,
        FilterPipe
    ],
    entryComponents: [
        UploadNewScriptsDialogComponent,
        DeletePresetDialogComponent,
        PresetNameComponent
    ],
    exports: [
        CommonFilterPipe,
        FilterPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
