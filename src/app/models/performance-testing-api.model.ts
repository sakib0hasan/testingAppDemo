import {TestLibraryScriptApi} from './single-test-api.model';

export class PerformanceTestingApiModel {
    PIN: string;
    TestLibrary: TestLibraryScriptApi[];
    ScriptSetting: string;
    RequestConfiguration: string;
    Loops: number;
    typeName: string;

    constructor() {
        this.typeName = 'PerformanceTestingApiModel';
    }
}
