import {TestLibraryScript} from './single-test-iot.model';

export class PerformanceTestingIotModel {
    Email: string;
    Password: string;
    PIN: string;
    TestLibrary: TestLibraryScript[];
    ScriptSetting: string;
    RequestConfiguration: string;
    Loops: number;
    typeName: string;

    constructor() {
        this.typeName = 'PerformanceTestingIotModel';
    }
}
