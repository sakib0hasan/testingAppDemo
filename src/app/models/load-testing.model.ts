import {TestLibraryScriptApi} from './single-test-api.model';

export class LoadTestingModel {
    PIN: string;
    TestLibrary: TestLibraryScriptApi[];
    ScriptSetting: string;
    LoadType: string;
    Threads: number;
    RamPeriod: number;
    typeName: string;

    constructor() {
        this.typeName = 'PerformanceTestingApiModel';
    }
}
