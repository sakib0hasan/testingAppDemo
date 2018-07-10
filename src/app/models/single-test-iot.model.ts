export class SingleTestIotModel{
    Email: string;
    Password: string;
    PIN: string;
    TestLibrary: TestLibraryScript[];
    ShowResultsFor: string[];
    ScriptSetting: string;
    typeName: string;
    constructor(){
        this.typeName = "SingleTestIotModel";
    }
}

export class TestLibraryScript{
    Command: string;
    ScriptName: string;
    TestLibrary: string;
    Params: Param[];
}

export class Param{
    constructor(private Name: string, private Value: string){

    }
}
