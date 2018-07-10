import {Param} from './single-test-iot.model';

export class SingleTestApiModel{
    PIN: string;
    TestLibrary: TestLibraryScriptApi[];
    ShowResultsFor: string[];
    ScriptSetting: string;
    typeName: string;
    constructor(){
        this.typeName = "SingleTestApiModel";
    }
}

export class TestLibraryScriptApi{
    ScriptName: string;
    TestLibrary: string;
    Params: Param[];
}
